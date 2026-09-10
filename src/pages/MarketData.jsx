import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  Filter,
  Search,
  Calendar,
  Layers,
  Database,
  TrendingUp
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import { ChartCard } from '../components/common/ChartCard';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { LoadingState } from '../components/common/LoadingState';
import { marketService } from '../services/marketService';

export const MarketData = () => {
  const [loading, setLoading] = useState(true);
  const [trends, setTrends] = useState([]);
  const [records, setRecords] = useState([]);
  const [chartType, setChartType] = useState('line');

  const [filters, setFilters] = useState({
    route: 'All',
    vesselType: 'All'
  });

  const fetchData = async () => {
    setLoading(true);
    const res = await marketService.getHistoricalData(filters);
    setTrends(res.trends);
    setRecords(res.records);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleExportCSV = () => {
    const headers = "Transaction ID,Date,Route,Vessel Type,Quantity (MT),Freight Rate ($/MT),BDI Index,Supplier\n";
    const csvContent = records.map(r => 
      `"${r.id}","${r.date}","${r.route}","${r.vesselType}",${r.quantityMT},${r.freightUSD},${r.bdi},"${r.supplier}"`
    ).join("\n");

    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `maritime_freight_market_data_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 m-0">
            <BarChart3 className="text-cyan-400" size={20} />
            Historical Shipping Market Analytics & Indexes
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Multi-year Baltic Dry Indices (BDI, BPI, BCI) & historical bulk freight rate transactions (2022 - 2026)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all shadow-md flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export CSV Dataset</span>
          </button>
          <DataSourceBadge source="Baltic Exchange Index & Customs DB" lastUpdated="10 Sep 2026" />
        </div>
      </div>

      {/* Filter & View Controls */}
      <div className="glass-card rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider">
          <Filter size={14} className="text-cyan-400" />
          Filter Dataset:
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                chartType === 'line' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              Line Trend
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                chartType === 'bar' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
              }`}
            >
              Quarterly Bar
            </button>
          </div>

          <select
            value={filters.route}
            onChange={(e) => setFilters({ ...filters, route: e.target.value })}
            className="py-1.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">Route: All Trade Lanes</option>
            <option value="Hay Point">Hay Point → Paradip</option>
            <option value="Newcastle">Newcastle → Vizag</option>
            <option value="Samarinda">Samarinda → Paradip</option>
            <option value="Baltimore">Baltimore → Paradip</option>
          </select>

          <select
            value={filters.vesselType}
            onChange={(e) => setFilters({ ...filters, vesselType: e.target.value })}
            className="py-1.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">Vessel Class: All</option>
            <option value="Panamax">Panamax</option>
            <option value="Supramax">Supramax</option>
            <option value="Capesize">Capesize</option>
            <option value="Handysize">Handysize</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading Historical Freight Indices..." />
      ) : (
        <>
          {/* Main Chart */}
          <ChartCard
            title="Baltic Dry Index (BDI, BPI, BCI) & Freight Rate Movements (2023 - 2026)"
            subtitle="Multi-year correlation between Baltic shipping indexes and Australia/Indonesia to East Coast India freight rates"
            source="Baltic Exchange Official Index"
            lastUpdated="10 Sep 2026"
          >
            <ResponsiveContainer width="100%" height={320}>
              {chartType === 'line' ? (
                <LineChart data={trends} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="yearMonth" stroke="#64748b" fontSize={11} />
                  <YAxis yAxisId="left" stroke="#06b6d4" fontSize={11} domain={['auto', 'auto']} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} unit=" $" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="BDI" name="Baltic Dry Index (BDI)" stroke="#06b6d4" strokeWidth={2} dot={false} />
                  <Line yAxisId="left" type="monotone" dataKey="BPI" name="Baltic Panamax Index (BPI)" stroke="#38bdf8" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="AusIndiaFreight" name="Australia → India Rate ($/MT)" stroke="#f59e0b" strokeWidth={2.5} />
                </LineChart>
              ) : (
                <BarChart data={trends} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="yearMonth" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#06b6d4" fontSize={11} unit=" $" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="AusIndiaFreight" name="Aus → India Freight ($/MT)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="IdnIndiaFreight" name="Idn → India Freight ($/MT)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </ChartCard>

          {/* Transaction Table */}
          <div className="glass-card rounded-xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Recent Historical Transactions & Customs Filings</h3>
              <span className="text-xs text-slate-400 font-mono">{records.length} Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Transaction ID</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Trade Route</th>
                    <th className="py-2.5 px-3">Vessel Class</th>
                    <th className="py-2.5 px-3">Parcel Size</th>
                    <th className="py-2.5 px-3">Freight Rate</th>
                    <th className="py-2.5 px-3">BDI Index</th>
                    <th className="py-2.5 px-3">Supplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono text-cyan-400">{r.id}</td>
                      <td className="py-2.5 px-3 text-slate-300">{r.date}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-100">{r.route}</td>
                      <td className="py-2.5 px-3 text-slate-200">{r.vesselType}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-200">{r.quantityMT.toLocaleString()} MT</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-400">${r.freightUSD} / MT</td>
                      <td className="py-2.5 px-3 font-mono text-slate-300">{r.bdi}</td>
                      <td className="py-2.5 px-3 text-slate-400">{r.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
