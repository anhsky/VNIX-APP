import React, { useState } from 'react';
import { Download, FileCode, Loader2, Play, StopCircle } from 'lucide-react';

export function PacketCapture() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [packets, setPackets] = useState(0);

  const toggleCapture = () => {
    if (isCapturing) {
      setIsCapturing(false);
    } else {
      setIsCapturing(true);
      setPackets(0);
      const interval = setInterval(() => {
        setPackets(prev => {
          if (prev > 1000) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.floor(Math.random() * 50);
        });
      }, 500);
    }
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
          <FileCode className="w-4 h-4 text-indigo-400" />
          Live Packet Capture (PCAP)
        </h3>
        {isCapturing && (
          <div className="flex items-center gap-1 text-[10px] text-rose-400 font-bold uppercase animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Recording
          </div>
        )}
      </div>

      <div className="p-4 bg-black/40 border border-slate-800 rounded-xl mb-6 flex flex-col items-center justify-center min-h-[120px] text-center">
        {isCapturing ? (
          <>
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
            <div className="text-xl font-mono font-bold text-slate-200">{packets.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Packets Captured</div>
          </>
        ) : (
          <>
            <FileCode className="w-8 h-8 text-slate-700 mb-3" />
            <div className="text-xs text-slate-500">Ready to capture raw traffic samples for deep inspection.</div>
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button 
          onClick={toggleCapture}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
            isCapturing 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500/30' 
              : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/20'
          }`}
        >
          {isCapturing ? <><StopCircle className="w-4 h-4" /> STOP CAPTURE</> : <><Play className="w-4 h-4" /> START CAPTURE</>}
        </button>
        <button 
          disabled={isCapturing || packets === 0}
          className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
