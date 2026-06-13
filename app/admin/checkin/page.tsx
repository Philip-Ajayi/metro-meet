'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, CheckCircle2, XCircle, Users, UserCheck, UserMinus, Loader2, ArrowLeft } from 'lucide-react';
import AnimatedBackground from '../../components/AnimatedBackground';

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  church: string;
  address: string;
  whatsapp: string;
  email: string;
  attended: boolean;
  createdAt: string;
}

export default function CheckinPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    regId: string;
    newAttendedState: boolean;
    name: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, [search]);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`/api/admin/registrations?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChangeClick = (reg: Registration) => {
    setConfirmModal({
      show: true,
      regId: reg._id,
      newAttendedState: !reg.attended,
      name: `${reg.firstName} ${reg.lastName}`,
    });
  };

  const confirmStatusChange = async () => {
    if (!confirmModal) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: confirmModal.regId,
          attended: confirmModal.newAttendedState,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) =>
          prev.map((r) => (r._id === confirmModal.regId ? { ...r, attended: confirmModal.newAttendedState } : r))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setActionLoading(false);
      setConfirmModal(null);
    }
  };

  // Stats calculation
  const total = registrations.length;
  const attendedCount = registrations.filter((r) => r.attended).length;
  const absentCount = total - attendedCount;

  return (
    <main className="relative min-h-screen px-4 md:px-8 py-12 text-slate-100 flex flex-col items-center">
      <AnimatedBackground />

      {/* Header */}
      <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-metro-gold uppercase tracking-wider transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-glass overflow-hidden border border-white/10 flex items-center justify-center p-1">
            <Image
              src="/wordHouseLogo/darkBackground.png"
              alt="Word House Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">Metro Meet 4.0 Check-In</h1>
            <p className="text-[10px] text-metro-gold uppercase font-bold tracking-widest">Attendance Management Stand</p>
          </div>
        </div>
      </div>

      {/* Stats Board */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 z-10">
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl text-left">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Registered</p>
            <p className="text-2xl font-bold text-white mt-1">{total}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Present / Checked In</p>
            <p className="text-2xl font-bold text-white mt-1">{attendedCount}</p>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex items-center gap-5 shadow-xl text-left">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/10 flex items-center justify-center text-rose-400">
            <UserMinus className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Absent / Outstanding</p>
            <p className="text-2xl font-bold text-white mt-1">{absentCount}</p>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="w-full max-w-6xl mb-6 z-10 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, city, or church..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-metro-gold/60 focus:ring-1 focus:ring-metro-gold/20 transition-all text-sm font-light shadow-xl"
          />
        </div>
      </div>

      {/* Main Grid table */}
      <div className="w-full max-w-6xl bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl z-10">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-metro-gold" />
              <span>Fetching Registrations...</span>
            </div>
          ) : registrations.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              No matching registrations found for the query.
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800/60 bg-slate-950/40">
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Location & Church</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {registrations.map((reg) => (
                  <tr key={reg._id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-white text-sm">{reg.firstName} {reg.lastName}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Registered: {new Date(reg.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="p-5">
                      <p className="text-xs text-slate-300 font-light">{reg.email}</p>
                      <p className="text-xs text-metro-gold mt-1 font-mono font-light">{reg.whatsapp}</p>
                    </td>
                    <td className="p-5 text-xs text-slate-300 font-light">
                      <p className="font-medium">{reg.church}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{reg.address}</p>
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          reg.attended
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {reg.attended ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Present
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Absent
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => handleStatusChangeClick(reg)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                          reg.attended
                            ? 'bg-slate-800 text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 border border-slate-700'
                            : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-metro-dark hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        }`}
                      >
                        {reg.attended ? 'Undo Attendance' : 'Check In'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Confirmation Warning Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-3xl p-6 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <h3 className="text-lg font-bold text-white mb-2">Attention Required</h3>
            <p className="text-sm text-slate-400 font-light leading-relaxed mb-6">
              Are you sure you want to mark <strong>{confirmModal.name}</strong> as{' '}
              <span className={confirmModal.newAttendedState ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                {confirmModal.newAttendedState ? 'PRESENT (Checked-In)' : 'ABSENT (Outstanding)'}
              </span>
              ?
            </p>
            <div className="flex gap-4">
              <button
                disabled={actionLoading}
                onClick={() => setConfirmModal(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={actionLoading}
                onClick={confirmStatusChange}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-metro-dark hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
