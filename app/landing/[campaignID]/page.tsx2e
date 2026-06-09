'use client';

import React, { useState } from 'react';
import { Shield, CreditCard, Landmark, CheckCircle, RefreshCw } from 'lucide-react';

export default function NativeZarConversionLanding() {
  const [selectedGateway, setSelectedGateway] = useState('fnb_eft');
  const [processing, setProcessing] = useState(false);
  const [activePaymentResponse, setActivePaymentResponse] = useState<any>(null);
  const [orderComplete, setOrderComplete] = useState(false);

  // Mocked state structure generated dynamically by our upstream AI engine response framework
  const landingData = {
    title: "Premium West-Coast Timber Micro-Crates",
    baseCostZar: 450.00,
    description: "Raw material architectural crates built directly in South Africa out of sustainable Western Cape timber resources. Built to military spec tolerances. Zero chemical coatings, zero plastics.",
    specifications: [
      { name: "Structural Material", content: "Solid South African Pine Wood Core" },
      { name: "Fastener Integrity", content: "Marine-Grade Counter-Sunk Stainless Steel Rivets" },
      { name: "Dimensional Metrics", content: "400mm x 300mm x 220mm Volumetric Ingestion" }
    ]
  };

  const handleTransactionFulfillment = async () => {
    setProcessing(true);
    try {
      const response = await fetch('/app/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: selectedGateway,
          amountZar: landingData.baseCostZar,
          customerEmail: 'buyer.telemetry@domain.co.za',
          productIdentifier: landingData.title
        })
      });
      const data = await response.json();
      
      if (selectedGateway === 'fnb_eft') {
        setActivePaymentResponse(data.bankingDetails);
      } else {
        // External Redirect Matrix for active deployment processors (PayFast/Ozow/Peach)
        alert(`Redirecting system payload securely straight to verified API endpoint gateway: ${data.endpoint}`);
        setOrderComplete(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-6 text-center">
        <CheckCircle className="w-16 h-16 text-emerald-600 mb-2" />
        <h1 className="text-2xl font-black uppercase tracking-wider">Gateway Secure Session Processed</h1>
        <p className="text-sm text-slate-600 mt-2 max-w-sm">Autonomous conversion loop tracking verification complete. Order credentials logged.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans px-6 py-12 md:py-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Informational Spec Array */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded border border-blue-200">System Verified Pure Pull Specification</span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3 uppercase">{landingData.title}</h1>
            <p className="text-xl font-mono font-bold text-slate-800 mt-1">R {landingData.baseCostZar.toFixed(2)} ZAR</p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{landingData.description}</p>
          
          <div className="border-t border-b border-slate-200 py-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">Verified Raw Material Dimensions</h3>
            <div className="space-y-2 font-mono text-xs">
              {landingData.specifications.map((spec, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-slate-100 last:border-none">
                  <span className="text-slate-500">{spec.name}</span>
                  <span className="text-slate-900 font-bold">{spec.content}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Local South African Payment Ingestion Hub */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" /> Secure Encryption Checkout Pipeline
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Select a transactional gateway. Zero tracking pixels, hidden processing fees, or subsequent upsells.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Select ZAR Processing Protocol</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setSelectedGateway('fnb_eft'); setActivePaymentResponse(null); }} className={`p-3 border rounded-lg text-left transition-colors flex items-center gap-2 text-xs font-medium ${selectedGateway === 'fnb_eft' ? 'border-blue-600 bg-blue-50/50 text-blue-900' : 'border-slate-200 bg-white text-slate-700'}`}>
                <Landmark className="w-4 h-4 text-blue-600" /> FNB Direct EFT
              </button>
              <button onClick={() => { setSelectedGateway('payfast'); setActivePaymentResponse(null); }} className={`p-3 border rounded-lg text-left transition-colors flex items-center gap-2 text-xs font-medium ${selectedGateway === 'payfast' ? 'border-red-600 bg-red-50/50 text-red-900' : 'border-slate-200 bg-white text-slate-700'}`}>
                <CreditCard className="w-4 h-4 text-red-500" /> PayFast Engine
              </button>
              <button onClick={() => { setSelectedGateway('ozow'); setActivePaymentResponse(null); }} className={`p-3 border rounded-lg text-left transition-colors flex items-center gap-2 text-xs font-medium ${selectedGateway === 'ozow' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900' : 'border-slate-200 bg-white text-slate-700'}`}>
                <RefreshCw className="w-4 h-4 text-emerald-600" /> Ozow Instant EFT
              </button>
              <button onClick={() => { setSelectedGateway('peach'); setActivePaymentResponse(null); }} className={`p-3 border rounded-lg text-left transition-colors flex items-center gap-2 text-xs font-medium ${selectedGateway === 'peach' ? 'border-orange-600 bg-orange-50/50 text-orange-900' : 'border-slate-200 bg-white text-slate-700'}`}>
                <CreditCard className="w-4 h-4 text-orange-500" /> Peach API Link
              </button>
            </div>
          </div>

          {/* Secure Execution Call to Action */}
          <button
            onClick={handleTransactionFulfillment}
            disabled={processing}
            className="w-full bg-slate-900 text-white font-bold font-mono uppercase tracking-wider text-xs py-4 px-6 rounded-lg transition-colors hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing && <RefreshCw className="w-4 h-4 animate-spin" />}
            {processing ? 'Authorizing Secure Nodes...' : 'Confirm Secure Order Ingestion'}
          </button>

          {/* Direct Bank Account Details Interface */}
          {activePaymentResponse && (
            <div className="bg-slate-950 text-slate-200 rounded-lg p-4 font-mono text-xs border border-slate-800 space-y-3 mt-4">
              <div className="text-amber-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800 pb-1 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" /> First National Bank Official Corporate Layout
              </div>
              <div className="space-y-1 text-[11px]">
                <p><span className="text-slate-500">Bank Institution:</span> {activePaymentResponse.institution}</p>
                <p><span className="text-slate-500">Account Owner:</span> {activePaymentResponse.accountName}</p>
                <p><span className="text-slate-500">Account Code Number:</span> <span className="text-white font-bold underline select-all">{activePaymentResponse.accountNumber}</span></p>
                <p><span className="text-slate-500">Branch Identity Code:</span> {activePaymentResponse.branchCode}</p>
                <p><span className="text-slate-500">Account Category:</span> {activePaymentResponse.accountType}</p>
                <p className="bg-blue-950 text-blue-300 p-2 rounded border border-blue-900 mt-2">
                  <span className="font-bold text-white uppercase block text-[10px]">Mandatory EFT Reference Number:</span>
                  <span className="text-sm font-bold underline select-all tracking-widest">{activePaymentResponse.requiredReference}</span>
                </p>
              </div>
              <p className="text-[10px] text-slate-400 italic mt-2 leading-relaxed">{activePaymentResponse.instructions}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
