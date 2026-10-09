import React, { useState } from "react";
import { CheckCircle2, Clock, FileText, Lock, Unlock, DollarSign, ArrowRight, ShieldCheck, RefreshCw, Trash2 } from "lucide-react";

export default function EngagementWorkspace({ briefs, creators, onNotify, onDeleteBrief }) {
  const [activeStage, setActiveStage] = useState(2);
  const [stages, setStages] = useState([
    { id: 1, name: "Brief & Scope Locked", completed: true, date: "Oct 02, 2026", amount: 1300 },
    { id: 2, name: "Seed & Prompt Approval", completed: true, date: "Oct 05, 2026", amount: 1300 },
    { id: 3, name: "Draft Generations (4K Renders)", completed: false, date: "In Progress", amount: 2600 },
    { id: 4, name: "Commercial Buyout Escrow Release", completed: false, date: "Locked", amount: 1300 }
  ]);

  const [promptSeed, setPromptSeed] = useState(
    "Ultra-detailed microscopic hydration particles penetrating dermal barrier, luminescent liquid refraction, volumetric cyan light, Unreal Engine 5 aesthetic --seed 84920492 --ar 9:16"
  );
  const [isPromptLocked, setIsPromptLocked] = useState(true);
  const [draftApproved, setDraftApproved] = useState(false);
  const [escrowReleased, setEscrowReleased] = useState(false);

  const togglePromptLock = () => {
    setIsPromptLocked(!isPromptLocked);
    onNotify?.(!isPromptLocked ? "Prompt seed & parameters approved and locked." : "Prompt unlocked for revision.");
  };

  const approveDrafts = () => {
    setDraftApproved(true);
    setStages(prev => prev.map(s => s.id === 3 ? { ...s, completed: true, date: "Approved Just Now" } : s));
    setActiveStage(4);
    onNotify?.("Draft generations approved. Milestone funds queued for final release.");
  };

  const handleReleaseEscrow = () => {
    setEscrowReleased(true);
    setStages(prev => prev.map(s => ({ ...s, completed: true, date: "Released" })));
    onNotify?.("Full contract escrow of $6,500.00 USD released to creator.");
  };

  const completedAmount = stages
    .filter(s => s.completed)
    .reduce((acc, curr) => acc + curr.amount, 0);

  if (briefs.length === 0) {
    return (
      <div className="text-center py-12 aura-vibe-card border border-white/10 rounded-2xl">
        <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto mb-3 opacity-50" />
        <p className="text-gray-400 text-sm">No active engagements. Create a brief first to start an engagement.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {briefs.map((brief, index) => (
        <div key={brief.id} className="aura-vibe-card rounded-2xl p-6 space-y-6 relative group/workspace">
          <button
            onClick={() => onDeleteBrief?.(brief.id)}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg opacity-0 group-hover/workspace:opacity-100 transition-all duration-300 z-10"
            title="Remove Engagement"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 pr-10">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${escrowReleased ? "bg-emerald-400" : "bg-amber-500 animate-pulse"}`}></span>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-500">
                  {escrowReleased ? "Engagement Contract Completed" : `Active Engagement #${brief.id.toString().slice(-4)}`}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">{brief.title}</h2>
              <p className="text-xs text-gray-400">Brand: {brief.client} &bull; Budget: {brief.budget}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-[#0D0D0D] border border-white/10 rounded-xl px-4 py-2 text-right">
                <span className="text-[10px] uppercase font-mono text-gray-400 block">Released / Escrow Total</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  ${completedAmount.toLocaleString()} / {brief.budget}
                </span>
              </div>
            </div>
          </div>

          {/* Milestone Stages Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {stages.map((stage) => (
              <div
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`cursor-pointer rounded-xl p-3.5 border transition ${
                  stage.completed
                    ? "bg-[#0D0D0D] border-emerald-500/40"
                    : activeStage === stage.id
                    ? "bg-[#0D0D0D] border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                    : "bg-[#0D0D0D]/50 border-white/10 text-gray-500"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase text-gray-400">Phase 0{stage.id}</span>
                  {stage.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <h4 className="text-xs font-semibold text-white mb-0.5">{stage.name}</h4>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>{stage.date}</span>
                  <span className="font-mono text-amber-500">${stage.amount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stage Panel */}
          <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-5 space-y-4">
            {activeStage === 1 && (
              <div className="space-y-3 text-xs">
                <h3 className="font-bold text-white text-sm">Contract Scope & Parameters (Phase 01)</h3>
                <p className="text-gray-300 leading-relaxed">
                  {brief.details}
                </p>
                <div className="p-3 aura-vibe-card rounded-lg flex items-center justify-between">
                  <span className="text-gray-400">Specification Signed by Both Parties</span>
                  <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Scope
                  </span>
                </div>
              </div>
            )}

            {activeStage === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Base Prompt Seed & LoRA Weight Sign-Off</h3>
                    <p className="text-xs text-gray-400">Lock the prompt architecture before full 60fps frame synthesis begins.</p>
                  </div>
                  <button
                    onClick={togglePromptLock}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
                      isPromptLocked
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                        : "bg-amber-500/20 border-amber-500 text-white"
                    }`}
                  >
                    {isPromptLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    <span>{isPromptLocked ? "Seed Locked" : "Click to Lock Seed"}</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  disabled={isPromptLocked}
                  value={promptSeed}
                  onChange={(e) => setPromptSeed(e.target.value)}
                  className="w-full aura-vibe-card rounded-lg p-3 text-xs font-mono text-gray-300 leading-relaxed focus:outline-none focus:border-amber-500 disabled:opacity-80"
                />
              </div>
            )}

            {activeStage === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">Draft Deliverable Pipeline</h3>
                    <p className="text-xs text-gray-400">Creator uploaded 2 camera iterations. Trajectory validated.</p>
                  </div>
                  <button
                    onClick={approveDrafts}
                    disabled={draftApproved}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      draftApproved
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-amber-500 text-darkBg font-bold hover:opacity-90"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{draftApproved ? "Drafts Approved" : "Approve 4K Cuts"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="aspect-video bg-black rounded-lg border border-white/10 overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80"
                      alt="Draft 1"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] bg-[#0D0D0D]/90 px-2 py-0.5 rounded text-amber-500 font-mono">
                      Cut 01 &bull; Master
                    </span>
                  </div>
                  <div className="aspect-video bg-black rounded-lg border border-white/10 overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80"
                      alt="Draft 2"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] bg-[#0D0D0D]/90 px-2 py-0.5 rounded text-amber-500 font-mono">
                      Cut 02 &bull; Alternate
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeStage === 4 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-sm">Commercial License & Escrow Release</h3>
                  <p className="text-xs text-gray-400">
                    Release remaining escrow balance with automated cryptographically signed IP transfer.
                  </p>
                </div>
                <button
                  onClick={handleReleaseEscrow}
                  disabled={escrowReleased}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition shrink-0 flex items-center gap-2 ${
                    escrowReleased
                      ? "bg-emerald-950 border border-emerald-800 text-emerald-300"
                      : "bg-emerald-500 hover:bg-emerald-400 text-darkBg shadow-lg"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{escrowReleased ? "Funds Fully Released" : `Release ${brief.budget} Escrow & IP`}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}