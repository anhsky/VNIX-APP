import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ThreatTicker({ lang }: { lang: 'en' | 'vi' }) {
  const intel = lang === 'en' ? [
    "CVE-2026-1029: Critical zero-day in popular VPN appliances actively exploited in the wild.",
    "BOTNET ALERT: New Mirai variant 'Ech0' targeting IoT devices on port 2323.",
    "BGP HIJACK: Suspicious route announcements detected from AS-UNKNOWN.",
    "DDoS TREND: 400Gbps NTP Amplification attacks on the rise in APAC region.",
    "THREAT INTEL: Malicious IPs updated from global honeypot network."
  ] : [
    "CVE-2026-1029: Lỗ hổng zero-day nghiêm trọng trên thiết bị VPN đang bị khai thác.",
    "CẢNH BÁO BOTNET: Biến thể Mirai mới 'Ech0' nhắm mục tiêu thiết bị IoT cổng 2323.",
    "BGP HIJACK: Phát hiện quảng bá định tuyến đáng ngờ từ AS-UNKNOWN.",
    "XU HƯỚNG DDoS: Tấn công khuếch đại NTP 400Gbps đang gia tăng tại khu vực APAC.",
    "TÌNH BÁO MỐI ĐE DỌA: Đã cập nhật IP độc hại từ mạng lưới honeypot toàn cầu."
  ];

  return (
    <div className="bg-rose-500/10 border-b border-rose-500/20 py-1.5 overflow-hidden flex items-center relative z-40">
      <div className="flex items-center gap-2 px-4 text-rose-400 font-bold text-xs whitespace-nowrap z-10 bg-[#0a0e17] shadow-[10px_0_10px_#0a0e17]">
        <AlertTriangle className="w-3 h-3 animate-pulse" />
        {lang === 'en' ? 'LIVE THREAT INTEL' : 'TÌNH BÁO MỐI ĐE DỌA'}
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap text-xs text-rose-300/80 font-mono flex gap-12 w-max hover:animation-play-state-paused">
          {intel.map((text, i) => <span key={i}>■ {text}</span>)}
          {intel.map((text, i) => <span key={`dup-${i}`}>■ {text}</span>)}
        </div>
      </div>
    </div>
  );
}
