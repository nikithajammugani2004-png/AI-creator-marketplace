import React, { useState } from "react";
import { Database, Cpu, Layers, ShieldCheck, Sparkles, FileText, CheckCircle2, ArrowRight, GitCommit } from "lucide-react";

export default function DataModelViewer() {
  const [activeTab, setActiveTab] = useState("creator");

  return (
    <div className="aura-vibe-card rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <Database className="w-4 h-4 text-amber-500" />
          <span className="text-xs uppercase font-mono tracking-wider text-amber-500">Platform Architecture</span>
        </div>
        <h2 className="text-xl font-bold text-white">System Data Models & Verification Specs</h2>
        <p className="text-xs text-gray-400 mt-1">
          Visual specifications of entity relations, AI pipeline tracking, and automatic commercial clearance checks.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("creator")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "creator"
              ? "bg-amber-500/20 text-amber-500 border border-amber-500/40"
              : "bg-[#0D0D0D] text-gray-400 border border-white/10 hover:text-white"
          }`}
        >
          Creator & Portfolio Model
        </button>
        <button
          onClick={() => setActiveTab("brief")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "brief"
              ? "bg-orange-500/20 text-orange-500 border border-orange-500/40"
              : "bg-[#0D0D0D] text-gray-400 border border-white/10 hover:text-white"
          }`}
        >
          Creative Brief Specification
        </button>
        <button
          onClick={() => setActiveTab("matchmaker")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === "matchmaker"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "bg-[#0D0D0D] text-gray-400 border border-white/10 hover:text-white"
          }`}
        >
          AI Matchmaking Logic
        </button>
      </div>

      {/* Tab 1: Creator Model */}
      {activeTab === "creator" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-amber-500">Core Identity</span>
              <h4 className="text-sm font-bold text-white">Verified Creator Entity</h4>
              <p className="text-xs text-gray-400">Stores verified handles, portfolio assets, and an indexed credibility rating.</p>
              <div className="pt-2 border-t border-white/10/60 space-y-1 text-[11px] text-gray-300">
                <div>&bull; Identity UUID & Handle</div>
                <div>&bull; Reputation Index (0-100)</div>
                <div>&bull; Commercial Clearance Badge</div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-orange-500">Engine Stack</span>
              <h4 className="text-sm font-bold text-white">Model Architecture</h4>
              <p className="text-xs text-gray-400">Categorizes tool competencies across generators, fine-tunes, and audio engines.</p>
              <div className="pt-2 border-t border-white/10/60 space-y-1 text-[11px] text-gray-300">
                <div>&bull; Runway Gen-3 / Sora / Kling</div>
                <div>&bull; Custom ComfyUI Nodes</div>
                <div>&bull; Voice Synthesis (ElevenLabs)</div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-[10px] uppercase font-mono text-emerald-400">Security & Legal</span>
              <h4 className="text-sm font-bold text-white">Commercial Rights Registry</h4>
              <p className="text-xs text-gray-400">Cryptographically logs checkpoints and licenses to guarantee buyout clearance.</p>
              <div className="pt-2 border-t border-white/10/60 space-y-1 text-[11px] text-gray-300">
                <div>&bull; Immutable Hash Audit</div>
                <div>&bull; Royalty-Free Voice Certs</div>
                <div>&bull; Complete IP Buyout Waiver</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Schema Field Visualizer</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 aura-vibe-card rounded-lg border border-white/10">
                <span className="text-gray-400 text-[10px] block">Field Name</span>
                <strong className="text-white font-mono">model_checkpoints</strong>
                <span className="text-amber-500 text-[10px] block mt-1">Array &lt;String&gt;</span>
              </div>
              <div className="p-3 aura-vibe-card rounded-lg border border-white/10">
                <span className="text-gray-400 text-[10px] block">Field Name</span>
                <strong className="text-white font-mono">aspect_ratios</strong>
                <span className="text-amber-500 text-[10px] block mt-1">9:16 | 16:9 | 1:1</span>
              </div>
              <div className="p-3 aura-vibe-card rounded-lg border border-white/10">
                <span className="text-gray-400 text-[10px] block">Field Name</span>
                <strong className="text-white font-mono">verified_safe</strong>
                <span className="text-emerald-400 text-[10px] block mt-1">Boolean (Audit)</span>
              </div>
              <div className="p-3 aura-vibe-card rounded-lg border border-white/10">
                <span className="text-gray-400 text-[10px] block">Field Name</span>
                <strong className="text-white font-mono">match_score</strong>
                <span className="text-orange-500 text-[10px] block mt-1">Integer (0-100)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Creative Brief Specification */}
      {activeTab === "brief" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-5 space-y-3">
              <span className="text-[10px] uppercase font-mono text-amber-500">Brand Deliverable Schema</span>
              <h4 className="text-sm font-bold text-white">Campaign Deliverables Structure</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Captures technical requirements that traditional freelance briefs miss: seed continuity, custom LoRA styles, and aspect ratio targets.
              </p>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center justify-between p-2 aura-vibe-card rounded-lg border border-white/10">
                  <span className="text-gray-300">Target Output Resolution</span>
                  <span className="text-amber-500 font-mono">4K Master (ProRes 422)</span>
                </div>
                <div className="flex items-center justify-between p-2 aura-vibe-card rounded-lg border border-white/10">
                  <span className="text-gray-300">Aspect Ratio Requirement</span>
                  <span className="text-amber-500 font-mono">9:16 Vertical &bull; 16:9 Landscape</span>
                </div>
                <div className="flex items-center justify-between p-2 aura-vibe-card rounded-lg border border-white/10">
                  <span className="text-gray-300">Style Consistency</span>
                  <span className="text-amber-500 font-mono">Trained LoRA Rig Required</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-5 space-y-3">
              <span className="text-[10px] uppercase font-mono text-orange-500">Legal & Financial Bounds</span>
              <h4 className="text-sm font-bold text-white">Commercial Rights & Escrow Model</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Protects the brand by holding payments in escrow until prompt seeds, test generations, and 4K masters pass verification.
              </p>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center justify-between p-2 aura-vibe-card rounded-lg border border-white/10">
                  <span className="text-gray-300">Milestone 01: Prompt Lock</span>
                  <span className="text-emerald-400 font-mono">20% Escrow Release</span>
                </div>
                <div className="flex items-center justify-between p-2 aura-vibe-card rounded-lg border border-white/10">
                  <span className="text-gray-300">Milestone 02: Draft Cuts</span>
                  <span className="text-emerald-400 font-mono">40% Escrow Release</span>
                </div>
                <div className="flex items-center justify-between p-2 aura-vibe-card rounded-lg border border-white/10">
                  <span className="text-gray-300">Milestone 03: Final Masters</span>
                  <span className="text-emerald-400 font-mono">40% Buyout Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Matchmaking Logic */}
      {activeTab === "matchmaker" && (
        <div className="space-y-6">
          <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-5 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-amber-500">Scoring Breakdown</span>
              <h4 className="text-sm font-bold text-white mt-0.5">Automated Match Index Formulation</h4>
              <p className="text-xs text-gray-400">
                Creators are ranked for brand briefs based on a multi-variable weighted score.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white font-medium">Tool & Engine Overlap (40% Weight)</span>
                  <span className="text-amber-500 font-mono">40 Points Max</span>
                </div>
                <div className="w-full h-2 aura-vibe-card rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-amber-500 w-[40%]"></div>
                </div>
                <span className="text-[11px] text-gray-500">Evaluates overlap between required tools (e.g. Flux.1, Runway) and creator's stack.</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white font-medium">Format Experience & Resolution History (30% Weight)</span>
                  <span className="text-orange-500 font-mono">30 Points Max</span>
                </div>
                <div className="w-full h-2 aura-vibe-card rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-orange-500 w-[30%]"></div>
                </div>
                <span className="text-[11px] text-gray-500">Validates prior verified pieces matching the required canvas aspect ratio.</span>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white font-medium">Clearance & Credibility Index (30% Weight)</span>
                  <span className="text-emerald-400 font-mono">30 Points Max</span>
                </div>
                <div className="w-full h-2 aura-vibe-card rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-emerald-400 w-[30%]"></div>
                </div>
                <span className="text-[11px] text-gray-500">Verified pipeline certification and 100% past commercial clearance pass rate.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}