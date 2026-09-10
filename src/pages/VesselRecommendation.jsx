import React, { useState, useEffect } from 'react';
import {
  Ship,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Award,
  ArrowRight,
  Anchor,
  Sparkles,
  Info
} from 'lucide-react';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { LoadingState } from '../components/common/LoadingState';
import { vesselService } from '../services/vesselService';

export const VesselRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    cargoQuantity: 75000,
    origin: 'Australia (Hay Point)',
    destination: 'Paradip',
    deliveryWindow: '15 Oct - 30 Oct 2026'
  });

  const [vesselData, setVesselData] = useState([]);
  const [recommendedVessel, setRecommendedVessel] = useState(null);

  const fetchRecommendations = async (params) => {
    setLoading(true);
    const res = await vesselService.getVessels(params);
    setVesselData(res.data);
    setRecommendedVessel(res.recommendedVessel);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations(inputs);
  }, []);

  const handleApplyInputs = (e) => {
    e.preventDefault();
    fetchRecommendations(inputs);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 m-0">
            <Ship className="text-cyan-400" size={20} />
            Vessel Recommendation & Charter Selection Engine
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Automated dry bulk vessel class suitability scoring based on port draft, LOA, daily charter rate & parcel size
          </p>
        </div>
        <DataSourceBadge source="BIMCO Bulk Standards & Fleet DB" lastUpdated="10 Sep 2026" />
      </div>

      {/* Input Parameters Filter Form */}
      <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Sliders className="text-cyan-400" size={16} />
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Cargo & Berth Constraints</h3>
        </div>

        <form onSubmit={handleApplyInputs} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Parcel Volume (MT)</label>
            <input
              type="number"
              value={inputs.cargoQuantity}
              onChange={(e) => setInputs({ ...inputs, cargoQuantity: e.target.value })}
              className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              step="5000"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Origin Port</label>
            <select
              value={inputs.origin}
              onChange={(e) => setInputs({ ...inputs, origin: e.target.value })}
              className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option>Australia (Hay Point)</option>
              <option>Australia (Gladstone)</option>
              <option>Indonesia (Samarinda)</option>
              <option>USA (Baltimore)</option>
              <option>Mozambique (Nacala)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Destination Port</label>
            <select
              value={inputs.destination}
              onChange={(e) => setInputs({ ...inputs, destination: e.target.value })}
              className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option>Paradip</option>
              <option>Vizag</option>
              <option>Gangavaram</option>
              <option>Gopalpur</option>
              <option>Dhamra</option>
              <option>Haldia</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Laycan / Delivery Window</label>
            <input
              type="text"
              value={inputs.deliveryWindow}
              onChange={(e) => setInputs({ ...inputs, deliveryWindow: e.target.value })}
              className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-md shadow-cyan-600/20 flex items-center gap-1.5 transition-all"
            >
              <Sparkles size={14} />
              <span>Evaluate Vessel Compatibility</span>
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <LoadingState message="Calculating Vessel Class Draft & Demurrage Risk..." />
      ) : (
        <>
          {/* Highlighted Recommended Vessel Banner */}
          {recommendedVessel && (
            <div className="p-6 rounded-2xl preserve-dark bg-gradient-to-r from-[#0c1f3a] via-[#0d2249] to-[#071428] border-2 border-cyan-400/70 shadow-2xl shadow-cyan-500/15 relative overflow-hidden space-y-4">
              <div className="absolute right-0 top-0 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-10 bottom-0 w-56 h-56 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                    <Award size={28} />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 rounded-full uppercase tracking-wider">
                      PRIMARY SYSTEM RECOMMENDATION
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight mt-1 m-0" style={{ color: '#ffffff' }}>
                      {recommendedVessel.class} Class Bulk Carrier
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Suitability Score</div>
                  <div className="text-3xl font-extrabold text-cyan-300 font-mono">
                    {recommendedVessel.suitabilityScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Reasons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
                {recommendedVessel.reasons.map((reason, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-cyan-400/20 text-xs text-slate-50 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium" style={{ color: '#f1f5f9' }}>{reason.replace(/^[✓!✗]\s*/, '')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full 4 Vessel Classes Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {vesselData.map((vessel) => {
              const isRec = vessel.isRecommended;
              return (
                <div
                  key={vessel.id}
                  className={`glass-card card-hover-glow rounded-xl p-5 border flex flex-col justify-between relative transition-all duration-300 cursor-pointer group hover:scale-[1.03] ${
                    isRec
                      ? 'border-cyan-500 shadow-xl shadow-cyan-500/10 bg-cyan-950/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/25'
                      : 'border-slate-800 hover:border-cyan-400/50 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/15'
                  }`}
                >
                  {isRec && (
                    <div className="absolute -top-3 left-4 px-3 py-0.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold text-[10px] rounded-full uppercase tracking-wider shadow-md">
                      RECOMMENDED
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-slate-100 m-0">{vessel.class}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">{vessel.capacityDWT.toLocaleString()} DWT</span>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-lg font-bold text-cyan-300">{vessel.suitabilityScore}</div>
                        <div className="text-[10px] text-slate-400">Score</div>
                      </div>
                    </div>

                    {/* Parameters List */}
                    <div className="space-y-2 py-3 border-y border-slate-800 text-xs text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Cargo Parcel:</span>
                        <span className="font-medium text-slate-100">{vessel.cargoCapacityRange}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Max Draft:</span>
                        <span className="font-mono text-cyan-400">{vessel.draftMeters} m</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">LOA / Beam:</span>
                        <span className="font-mono text-slate-200">{vessel.loaMeters}m / {vessel.beamMeters}m</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Daily Charter Rate:</span>
                        <span className="font-semibold text-slate-100">${vessel.dailyCharterRateUSD.toLocaleString()} / day</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Est. Freight Rate:</span>
                        <span className="font-bold text-emerald-400">${vessel.estimatedFreightUSDMT} / MT</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Demurrage Risk:</span>
                        <span className="text-amber-400 font-medium">{vessel.idleTimeRisk}</span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      <div className="text-[11px] font-semibold text-slate-400">Port Compatibility:</div>
                      <p className="text-xs text-slate-300 m-0 leading-relaxed">{vessel.portCompatibility}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <button
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isRec
                          ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <span>Select {vessel.class} Charter</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
