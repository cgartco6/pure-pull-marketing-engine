'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ShieldAlert, Target, RefreshCw, Layers, Sparkles, CreditCard, ExternalLink } from 'lucide-react';

const telemetryMockData = [
  { name: 'Ad Set 1', conversions: 44, clicks: 120, bounce: 22 },
  { name: 'Ad Set 2', conversions: 59, clicks: 180, bounce: 19 },
  { name: 'Ad Set 3', conversions: 31, clicks: 95, bounce: 28 },
  { name: 'Ad Set 4', conversions: 78, clicks: 210, bounce: 14 },
  { name: 'Ad Set 5', conversions: 92, clicks: 245, bounce: 12 },
];

export default function EngineDashboard() {
  const [loading, setLoading] = useState(false);
  const [visionInput, setVisionInput] = useState('');
  const [platform, setPlatform] = useState('Meta Ads');
  const [priceZar, setPriceZar] = useState('450');
  const [enginePayload, setEnginePayload] = useState<any>(null);

  const triggerGenerationEngine = async () => {
    if (!visionInput) return alert('Please enter your ad vision parameters.');
    setLoading(true);
    try {
      const response = await fetch('/api/marketing-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productVision: visionInput,
          productContext: 'Direct industrial design utility blueprint configuration built for longevity.',
          targetPlatform: platform,
          targetPriceZar: parseFloat(priceZar) || 0
        }),
      });
      const data = await response.json();
      if (data.success) setEnginePayload(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <header className="border-b border-slate-800 pb-6 mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-blue-400 font-mono">SOVEREIGN PULL ENGINE v1.1</h1>
          <p className="text-xs text-slate-400 mt-1">Autonomous multi-channel compliance, asset production, and conversion architecture.</p>
        </div>
      </header>

      {/* Input Formulation Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" /> System Control Console
          </h2>
          <div>
            <label className="block text-[11px] uppercase text-slate-400 font-mono mb-1">Enter Creative Vision / Target Parameter</label>
            <textarea
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
              placeholder="e.g., Bulk organic food storage crates manufactured from raw Western Cape timber, zero plastic footprint, high longevity factor..."
              value={visionInput}
              onChange={(e) => setVisionInput(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase text-slate-400 font-mono mb-1">Platform Rules Template</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none"
              >
                <option value="Meta Ads">Meta Ad Ecosystem</option>
                <option value="Google Ads">Google Search Vector</option>
                <option value="TikTok Ads">TikTok Media Stream</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase text-slate-400 font-mono mb-1">Value Matrix (ZAR)</label>
              <input
                type="number"
                value={priceZar}
                onChange={(e) => setPriceZar(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none font-mono"
              />
            </div>
          </div>
          <button
            onClick={triggerGenerationEngine}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Compiling Ad Models...' : 'Execute Asset Generation Loop'}
          </button>
        </div>

        {/* Live System Performance Outputs */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Live A/B Data Optimization Monitor
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={telemetryMockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontclassName="font-mono text-[10px]" />
                <YAxis stroke="#64748b" fontclassName="font-mono text-[10px]" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="clicks" name="Ad Clicks Captured" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" name="ZAR Conversions Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dynamic Asset Grid: Render 5 Non-Repeating Ads */}
      {enginePayload && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-widest mb-3">platform compilation verification matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div><span className="text-slate-500">Live Scrape Applied:</span> <p className="text-slate-200 mt-0.5">{enginePayload.platformRulesApplied}</p></div>
              <div><span className="text-slate-500">Scheduling Vector:</span> <p className="text-slate-200 mt-0.5">{enginePayload.complianceMetrics.schedule}</p></div>
              <div><span className="text-slate-500">Frequency Sequence:</span> <p className="text-slate-200 mt-0.5">{enginePayload.complianceMetrics.frequency}</p></div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" /> Active 5-Pack Non-Repeating Live Production Ad Sets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {enginePayload.generatedAdSets.map((ad: any, idx: number) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded text-blue-300">AD VARIANT #{ad.adIndex}</span>
                    </div>
                    <img src={ad.realGeneratedImageUrl} alt="Asset Production Snapshot" className="w-full aspect-square object-cover rounded-lg bg-slate-950 border border-slate-800" />
                    <p className="text-xs font-bold text-slate-200 line-clamp-1">{ad.headlineText}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-4">{ad.primaryText}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[9px] font-mono text-slate-500 block mb-1">PROMPT METHOD:</span>
                    <p className="text-[10px] text-slate-400 italic line-clamp-2 bg-slate-950 p-1.5 rounded border border-slate-850 font-mono">{ad.imageGenerationPrompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
