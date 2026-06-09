'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ShieldAlert, Target, RefreshCw, Layers, Sparkles, Download, AlertTriangle } from 'lucide-react';

const telemetryMockData = [
  { name: 'Ad Set 1', conversions: 44, clicks: 120, bounce: 22 },
  { name: 'Ad Set 2', conversions: 59, clicks: 180, bounce: 19 },
  { name: 'Ad Set 3', conversions: 31, clicks: 95, bounce: 28 },
  { name: 'Ad Set 4', conversions: 78, clicks: 210, bounce: 14 },
  { name: 'Ad Set 5', conversions: 92, clicks: 245, bounce: 12 },
];

const buyerDemographics = [
  { location: 'Gauteng, ZA', buyers: 420, allocation: 'High Intent / Corporate' },
  { location: 'Western Cape, ZA', buyers: 310, allocation: 'Impulse / Direct' },
  { location: 'KwaZulu-Natal, ZA', buyers: 185, allocation: 'Direct Utility' },
  { location: 'Eastern Cape, ZA', buyers: 95, allocation: 'High Value Cohort' },
];

export default function EngineDashboard() {
  const [loading, setLoading] = useState(false);
  const [visionInput, setVisionInput] = useState('');
  const [platform, setPlatform] = useState('Meta Ads');
  const [priceZar, setPriceZar] = useState('250');
  const [enginePayload, setEnginePayload] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const triggerGenerationEngine = async () => {
    if (!visionInput) return;
    setLoading(true);
    setErrorMessage(null);
    setEnginePayload(null);
    try {
      const response = await fetch('/api/marketing-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productVision: visionInput,
          productContext: 'Direct high-intent processing matrix.',
          targetPlatform: platform,
          targetPriceZar: parseFloat(priceZar) || 0
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        setEnginePayload(data);
      } else {
        setErrorMessage(data.error || "The API processed the request but returned a failure status.");
      }
    } catch (err: any) {
      setErrorMessage(`Network Connection Interrupted: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadAssetsToDevice = () => {
    if (!enginePayload || !enginePayload.generatedAdSets) return;
    
    let textDump = `==================================================\n`;
    textDump += `PURE-PULL AUTONOMOUS MARKETING ENGINE ASSET LOG\n`;
    textDump += `==================================================\n\n`;
    
    enginePayload.generatedAdSets.forEach((ad: any) => {
      textDump += `AD VARIANT #${ad.adIndex} (${ad.hookStyle || 'Standard Hook'})\n`;
      textDump += `--------------------------------------------------\n`;
      textDump += `HEADLINE: ${ad.headlineText}\n`;
      textDump += `PRIMARY COPY: ${ad.primaryText}\n`;
      textDump += `IMAGE PIPELINE PROMPT: ${ad.imageGenerationPrompt}\n`;
      textDump += `MOCK IMAGE SOURCE URL: ${ad.realGeneratedImageUrl}\n\n`;
    });

    const element = document.createElement("a");
    const file = new Blob([textDump], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ad-bundle-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans max-w-md mx-auto md:max-w-none">
      <header className="border-b border-slate-800 pb-4 mb-6">
        <h1 className="text-xl font-black tracking-wider text-blue-400 font-mono">SOVEREIGN PULL ENGINE v1.1</h1>
        <p className="text-[11px] text-slate-400 mt-1">Autonomous multi-channel compliance, asset production, and conversion architecture.</p>
      </header>

      <div className="space-y-6 mb-6">
        {/* Console Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" /> System Control Console
          </h2>
          <div>
            <label className="block text-[10px] uppercase text-slate-400 font-mono mb-1">Enter Creative Vision / Target Parameter</label>
            <textarea
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
              placeholder="Enter details..."
              value={visionInput}
              onChange={(e) => setVisionInput(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-mono mb-1">Platform Rules</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none"
              >
                <option value="Meta Ads">Meta Ad Ecosystem</option>
                <option value="Google Ads">Google Search Vector</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-400 font-mono mb-1">Value Matrix (ZAR)</label>
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

        {/* Live Debug/Error Log Area */}
        {errorMessage && (
          <div className="bg-rose-950/50 border border-rose-800 rounded-xl p-4 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold text-rose-400 uppercase">API Error Caught</h4>
              <p className="text-[11px] text-rose-300 mt-1 font-mono break-all">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Analytics Display Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" /> Live A/B Data Optimization Monitor
          </h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={telemetryMockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '9px', fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '9px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="clicks" name="Clicks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="conversions" name="Conversions" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[9px] uppercase text-slate-400 block font-mono">Conv %</span>
          <div className="text-sm font-bold font-mono text-emerald-400 mt-1">5.14%</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[9px] uppercase text-slate-400 block font-mono">Bounce</span>
          <div className="text-sm font-bold font-mono text-rose-400 mt-1">18.6%</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
          <span className="text-[9px] uppercase text-slate-400 block font-mono">Vector</span>
          <div className="text-sm font-bold font-mono text-purple-400 mt-1">OPTIMAL</div>
        </div>
      </div>

      {/* Table Layer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase mb-3">Regional Metrics</h3>
        <div className="space-y-2 text-xs font-mono">
          {buyerDemographics.map((row, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-slate-800 pb-2 last:border-0">
              <span className="text-slate-200 font-bold">{row.location}</span>
              <span className="text-emerald-400">{row.buyers} inv</span>
            </div>
          ))}
        </div>
      </div>

      {/* Output Render Layer */}
      {enginePayload && enginePayload.generatedAdSets && (
        <div className="space-y-6 mt-6 border-t border-blue-900/50 pt-6">
          <div className="bg-slate-900 border border-blue-900/50 rounded-xl p-4 space-y-3 text-center">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Compilation Successful</h3>
            <p className="text-[11px] text-slate-400">Assets are compiled in local phone memory.</p>
            <button
              onClick={downloadAssetsToDevice}
              className="w-full bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-mono font-bold text-xs uppercase py-2.5 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Save Copy Pack (.txt)
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" /> Generated 5-Pack Production Ad Sets
            </h2>
            
            <div className="space-y-4">
              {enginePayload.generatedAdSets.map((ad: any, idx: number) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-blue-300">VARIANT #{ad.adIndex}</span>
                    <span className="text-[10px] font-mono text-slate-400">{ad.hookStyle || 'Organic Pull'}</span>
                  </div>
                  {ad.realGeneratedImageUrl && (
                    <img 
                      src={ad.realGeneratedImageUrl} 
                      alt="Ad Asset" 
                      className="w-full aspect-video object-cover rounded-lg bg-slate-950 border border-slate-800" 
                    />
                  )}
                  <h4 className="text-xs font-bold text-slate-200 font-mono">{ad.headlineText}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-850">{ad.primaryText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
