import React, { useState } from 'react';
import { Zap, Server, Activity, RefreshCw, CheckCircle2, CloudLightning, FileCode2, Image as ImageIcon } from 'lucide-react';

export function PerformanceOptimization() {
  const [cachingLevel, setCachingLevel] = useState('Standard');
  const [minify, setMinify] = useState({ js: true, css: true, html: false });
  const [brotli, setBrotli] = useState(true);
  const [imageOptimization, setImageOptimization] = useState(false);
  const [isPurging, setIsPurging] = useState(false);

  const handlePurgeCache = async () => {
    if (confirm('Are you sure you want to purge everything from the cache? This may temporarily increase load on your origin server.')) {
      setIsPurging(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsPurging(false);
      alert('Cache purged successfully.');
    }
  };

  const toggleMinify = (type: keyof typeof minify) => {
    setMinify(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            Performance & Caching
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Optimize delivery speed and reduce origin load</p>
        </div>
        <button 
          onClick={handlePurgeCache}
          disabled={isPurging}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold hover:bg-rose-500/20 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isPurging ? 'animate-spin' : ''}`} />
          {isPurging ? 'PURGING...' : 'PURGE EVERYTHING'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <Server className="w-4 h-4" />
            Caching Level
          </div>
          <div className="space-y-3">
            {['No Query String', 'Ignore Query String', 'Standard'].map(level => (
              <button 
                key={level}
                onClick={() => setCachingLevel(level)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  cachingLevel === level 
                    ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-sm font-bold">{level}</div>
                {cachingLevel === level && <CheckCircle2 className="w-5 h-5" />}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-2">
            Standard: Delivers a different resource each time the query string changes.
          </p>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <FileCode2 className="w-4 h-4" />
            Auto Minify
          </div>
          <p className="text-[10px] text-slate-500">Reduce the file size of source code on your website.</p>
          <div className="space-y-3">
            {(['js', 'css', 'html'] as const).map(type => (
              <div key={type} className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="text-sm font-bold text-slate-200 uppercase">{type}</div>
                <button 
                  onClick={() => toggleMinify(type)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${minify[type] ? 'bg-indigo-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${minify[type] ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <CloudLightning className="w-4 h-4" />
            Brotli Compression
          </div>
          <p className="text-[10px] text-slate-500">Speed up page load times for your visitor's HTTPS traffic by applying Brotli compression.</p>
          <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-sm font-bold text-slate-200">Enable Brotli</div>
            <button 
              onClick={() => setBrotli(!brotli)}
              className={`w-12 h-6 rounded-full relative transition-colors ${brotli ? 'bg-indigo-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brotli ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <ImageIcon className="w-4 h-4" />
            Image Optimization (Polish)
          </div>
          <p className="text-[10px] text-slate-500">Strip metadata and compress your images for faster page load times.</p>
          <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div>
              <div className="text-sm font-bold text-slate-200">Lossless Compression</div>
              <div className="text-[10px] text-slate-500 mt-1">Reduce size without impacting visual quality</div>
            </div>
            <button 
              onClick={() => setImageOptimization(!imageOptimization)}
              className={`w-12 h-6 rounded-full relative transition-colors ${imageOptimization ? 'bg-indigo-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${imageOptimization ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
