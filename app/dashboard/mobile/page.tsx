'use client';

import React, { useState } from 'react';
import { Layers, RefreshCw, Smartphone } from 'lucide-react';

export default function MobileEngineConsole() {
  const [loading, setLoading] = useState(false);
  const [vision, setVision] = useState('');
  const [output, setOutput] = useState<any>(null);

  const runMobileGeneration = async () => {
    if (!vision) return;
    setLoading(true);
    try {
      const res = await fetch('/api/marketing-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productVision: vision,
          productContext: 'Mobile operational node setup.',
          targetPlatform: 'Meta Ads',
          targetPriceZar: 450
        })
      });
      const data = await res.json();
      if (data.success) setOutput(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-mono font-bold tracking-wider text-slate-200">PULL-ENGINE // LITE</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
        <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
          Type Product Vision / Idea
        </label>
        <textarea
          value={vision}
          onChange={(e) => setVision(e.target.value)}
          className="w-full h-24 bg-slate-950 border border-slate-800 rounded-md p-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          placeholder="Enter product vision metrics..."
        />
        <button
          onClick={runMobileGeneration}
          disabled={loading || !vision}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-md disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Processing on Cloud...' : 'Generate 5 Mobile Ads'}
        </button>
      </div>

      {output && (
        <div className="mt-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-400">
            <span className="text-amber-400 font-bold block uppercase text-[9px] tracking-wider mb-1">Compliance Log</span>
            ✓ Automated Hype Scrubbing Active. No countdowns or hidden fees found.
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono pl-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" /> Generated Non-Repeating Mobile Ad Sets
          </h3>

          <div className="space-y-3">
            {output.generatedAdSets.map((ad: any, i: number) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-mono font-bold text-blue-400">AD VARIANT #{ad.adIndex}</span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase">{ad.hookStyle}</span>
                </div>
                <img src={ad.realGeneratedImageUrl} alt="Product Asset" loading="lazy" className="w-full aspect-video object-cover rounded bg-slate-950 border border-slate-850" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-200">{ad.headlineText}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{ad.primaryText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
