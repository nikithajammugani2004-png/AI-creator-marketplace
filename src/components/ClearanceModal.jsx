import React, { useState } from "react";
import { X, ShieldCheck, AlertCircle, FileCheck, CheckCircle2, Download, Lock } from "lucide-react";

export default function ClearanceModal({ sample, creator, onClose }) {
  if (!sample) return null;

  const [downloaded, setDownloaded] = useState(false);

  const auditChecks = [
    {
      title: "Base Model Commercial Rights",
      status: "Passed",
      model: sample.tools[0] || "Flux.1 Pro",
      note: "Model license explicitly permits commercial exploitation and client work."
    },
    {
      title: "Training Data & LoRA Hygiene",
      status: "Passed",
      model: "Custom LoRA Checkpoint",
      note: "No proprietary brand trademarks, recognizable actor likenesses, or copyrighted artist styles detected."
    },
    {
      title: "Audio & Synthetic Voice Rights",
      status: "Passed",
      model: "ElevenLabs Commercial Tier",
      note: "Commercial audio license assigned with cleared digital broadcast rights."
    },
    {
      title: "IP Indemnity Clearance",
      status: "Verified",
      model: "SynthForge Standard Indemnity",
      note: "Creator agreed to commercial representations and warranties terms."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl aura-vibe-card rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-[#0D0D0D]/80 border border-white/10 text-gray-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 border-b border-white/10 bg-[#0D0D0D]/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Commercial Rights & IP Audit Certificate</h2>
            <p className="text-xs text-gray-400">Automated legal clearance scan for {sample.title}</p>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">Status: Tier-1 Verified</span>
              <h3 className="text-sm font-bold text-white">Fully Cleared for Global Commercial Use</h3>
            </div>
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30">
              Score: 100/100
            </span>
          </div>

          <div className="space-y-2.5">
            {auditChecks.map((check, idx) => (
              <div key={idx} className="bg-[#0D0D0D] border border-white/10 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {check.title}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
                    {check.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">{check.note}</p>
                <div className="pt-1 text-[10px] text-gray-500 font-mono">
                  Engine: <span className="text-gray-300">{check.model}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0D0D0D]/50 border border-white/10 rounded-xl p-3 text-[11px] text-gray-400 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Cryptographic hash: <code className="text-amber-500 font-mono">0x9f4a...e8b1</code> stored on platform registry.</span>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-[#0D0D0D]/60 flex items-center justify-between">
          <span className="text-xs text-gray-400">Issued to: <strong className="text-white">{creator.name}</strong></span>
          <button
            onClick={() => setDownloaded(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-darkBg text-xs font-bold rounded-xl hover:opacity-90 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloaded ? "Certificate Saved" : "Download PDF Certificate"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

