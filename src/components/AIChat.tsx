import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Tôi là trợ lý AI của VNIX Anycast. Bạn có thắc mắc gì về hệ thống phòng thủ DDoS hoặc cách thức hoạt động của chúng tôi không?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Lỗi: Chưa cấu hình API Key cho AI. Vui lòng thêm biến môi trường GEMINI_API_KEY hoặc VITE_GEMINI_API_KEY trên hosting của bạn.' }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `Bạn là một chuyên gia bảo mật mạng và kỹ sư hệ thống tại VNIX Anycast Scrubbing Center. 
            Nhiệm vụ của bạn là giải đáp các thắc mắc của người dùng về:
            1. Cách thức hoạt động của Anycast DNS và Scrubbing Center.
            2. Các loại tấn công DDoS (TCP Flood, UDP Flood, ICMP, HTTP Layer 7).
            3. Cách hệ thống VNIX sử dụng XDP/eBPF để lọc traffic ở tốc độ cao.
            4. Giải thích các thông số trên dashboard (PPS, BPS, Anomaly Score).
            5. Nếu người dùng muốn liên hệ hỗ trợ hoặc hợp tác, hãy cung cấp email: support@vnixanycast.site
            
            Hãy trả lời bằng tiếng Việt, chuyên nghiệp, súc tích và dễ hiểu. 
            Nếu người dùng hỏi về việc tấn công DDoS thật, hãy từ chối khéo léo và giải thích về tầm quan trọng của bảo mật.
            
            Câu hỏi của người dùng: ${userMessage}` }]
          }
        ],
        config: {
          temperature: 0.7,
          topP: 0.95,
          topK: 64,
        }
      });

      const aiResponse = response.text || "Xin lỗi, tôi gặp chút trục trặc khi xử lý câu hỏi của bạn. Hãy thử lại nhé!";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Có lỗi xảy ra khi kết nối với máy chủ AI. Vui lòng kiểm tra lại sau.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '60px' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-[350px] md:w-[400px] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">VNIX AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-indigo-100 uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                          msg.role === 'user' ? 'bg-indigo-500' : 'bg-slate-800 border border-slate-700'
                        }`}>
                          {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-indigo-400" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm ${
                          msg.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none' 
                            : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'
                        }`}>
                          <div className="markdown-body prose prose-invert prose-sm max-w-none">
                            <Markdown>{msg.content}</Markdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 flex-row">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                          <span className="text-xs text-slate-400">AI đang suy nghĩ...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Hỏi về DDoS, Anycast, VNIX..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-500"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 text-center">
                    Powered by Gemini 3.1 Flash • VNIX Security Assistant
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center group relative"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Hỏi trợ lý AI
          </span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-slate-950 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
        </motion.button>
      )}
    </div>
  );
}
