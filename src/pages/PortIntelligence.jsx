import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Search,
  Filter,
  Layers,
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { Modal } from '../components/common/Modal';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { portService } from '../services/portService';

export const PortIntelligence = () => {
  const [loading, setLoading] = useState(true);
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    searchQuery: '',
    status: 'All',
    congestion: 'All',
    minDraft: ''
  });

  const fetchPorts = async () => {
    setLoading(true);
    const res = await portService.getAllPorts(filters);
    setPorts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPorts();
  }, [filters]);

  const handleOpenPortModal = (port) => {
    setSelectedPort(port);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 m-0">
            <Anchor className="text-cyan-400" size={20} />
            East Coast Indian Port Intelligence Hub
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Real-time berth drafts, LOA restrictions, handling rates & anchorage waiting congestion
          </p>
        </div>
        <DataSourceBadge source="Indian Port Association (IPA)" lastUpdated="10 Sep 2026, 06:00" />
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-xl p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search port name, code, state..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">Status: All</option>
              <option value="Operational">Operational</option>
              <option value="Delayed">Delayed</option>
              <option value="Restricted">Restricted</option>
            </select>
          </div>

          <div>
            <select
              value={filters.congestion}
              onChange={(e) => setFilters({ ...filters, congestion: e.target.value })}
              className="py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">Congestion: All</option>
              <option value="Low">Low Congestion</option>
              <option value="Medium">Medium Congestion</option>
              <option value="High">High Congestion</option>
            </select>
          </div>

          <div>
            <select
              value={filters.minDraft}
              onChange={(e) => setFilters({ ...filters, minDraft: e.target.value })}
              className="py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="">Draft: Any</option>
              <option value="14">Draft &ge; 14.0m</option>
              <option value="17">Draft &ge; 17.0m (Capesize)</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Fetching Port Authority Telemetry Data..." />
      ) : ports.length === 0 ? (
        <EmptyState
          title="No Ports Match Criteria"
          description="Try resetting your draft or congestion filters to see all 7 East Coast Indian ports."
          onReset={() => setFilters({ searchQuery: '', status: 'All', congestion: 'All', minDraft: '' })}
        />
      ) : (
        /* Ports Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ports.map((port) => (
            <div
              key={port.id}
              className="glass-card rounded-xl p-5 border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors m-0">
                      {port.name}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">{port.code} • {port.state}</span>
                  </div>
                  <StatusBadge status={port.status} />
                </div>

                {/* Infrastructure Metric Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 my-3 text-center">
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Max Draft</div>
                    <div className="text-sm font-extrabold text-cyan-300 font-mono">{port.maxDraft}m</div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Max LOA</div>
                    <div className="text-sm font-extrabold text-slate-200 font-mono">{port.maxLOA}m</div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Max Beam</div>
                    <div className="text-sm font-extrabold text-slate-200 font-mono">{port.maxBeam}m</div>
                  </div>
                </div>

                {/* Operations & Congestion */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Handling Capacity:</span>
                    <span className="font-bold text-slate-100">{port.handlingCapacityTPD.toLocaleString()} TPD</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Anchorage Congestion:</span>
                    <span className="font-medium text-amber-400">{port.avgWaitTimeDays} Days Wait</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Turnaround Time:</span>
                    <span className="font-mono text-slate-200">{port.avgTurnaroundHrs} Hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{port.activeVesselsAtAnchorage} Vessels at Anchorage</span>
                <button
                  onClick={() => handleOpenPortModal(port)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-300 rounded-lg border border-slate-700 transition-all flex items-center gap-1"
                >
                  <span>Port Profile</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Port Profile Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPort ? `${selectedPort.name} Infrastructure Profile` : 'Port Details'}
      >
        {selectedPort && (
          <div className="space-y-5 text-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-slate-400">Port Code: {selectedPort.code}</span>
                <div className="text-sm font-bold text-slate-100">{selectedPort.state}, India</div>
              </div>
              <StatusBadge status={selectedPort.status} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Draft Limit</div>
                <div className="text-base font-bold text-cyan-300 font-mono mt-1">{selectedPort.maxDraft} meters</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Berth Count</div>
                <div className="text-base font-bold text-slate-100 font-mono mt-1">{selectedPort.operationalBerths} Active</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Demurrage Rate</div>
                <div className="text-base font-bold text-rose-400 font-mono mt-1">${selectedPort.demurrageRatePerDayUSD.toLocaleString()} / day</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Wait Queue</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-1">{selectedPort.activeVesselsAtAnchorage} Ships</div>
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-300 mb-1.5">Cargo Handling Types</div>
              <div className="flex flex-wrap gap-2">
                {selectedPort.cargoTypes.map((c, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                <ShieldAlert size={14} />
                Port Authority Operational Note
              </div>
              <p className="text-slate-300 leading-relaxed m-0">{selectedPort.dataNote}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <DataSourceBadge source="Indian Port Association Official Gazette" lastUpdated="10 Sep 2026" />
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 text-slate-200 hover:bg-slate-700 rounded-lg"
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
