import React, { useState } from "react";
import { X, ShieldCheck, Cpu, GitFork, Sparkles, Layers, Sliders, CheckCircle2 } from "lucide-react";
import ClearanceModal from "./ClearanceModal";

export default function PortfolioModal({ sample, creator, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showClearance, setShowClearance] = useState(false);

  if (!sample) return null;

  const pipelineNodes = [
    { title: "Base Prompt", type: "Input", detail: sample.promptText || "Negative prompt filtered", icon: Sparkles },
    { title: "Primary Model", type: "Generator", detail: sample.tools[0] || "Flux.1 Pro", icon: Cpu },
    { title: "Conditioning / LoRA", type: "Latent Control", detail: "Custom Style LoRA (weight 0.85)", icon: Layers },
    { title: "Motion & Refine", type: "Sampler", detail: sample.tools[1] || "Runway Gen-3", icon: Sliders },
    { title: "Upscale & Output", type: "Deliverable", detail: "Topaz Video AI 4K 60fps", icon: CheckCircle2 }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl aura-vibe-card rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg bg-[#0D0D0D]/80 border border-white/10 text-gray-300 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex border-b border-white/10 bg-[#0D0D0D]/50 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2.5 text-xs font-semibold transition border-b-2 ${
              activeTab === "overview" ? "border-amber-500 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            Artwork & Specs
          </button>
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`pb-2.5 text-xs font-semibold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "pipeline" ? "border-orange-500 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <GitFork className="w-3.5 h-3.5 text-orange-500" />
            <span>Node Pipeline Graph</span>
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black rounded-xl overflow-hidden flex items-center justify-center border border-white/10 relative">
                {sample.videoUrl ? (
                  <video
                    src={sample.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    poster={sample.thumb}
                    className="w-full h-full max-h-[420px] object-cover"
                  />
                ) : (
                  <img
                    src={sample.thumb}
                    alt={sample.title}
                    className="w-full h-full max-h-[420px] object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-amber-500 uppercase tracking-wider block">
                    {sample.format}
                  </span>
                  <h2 className="text-xl font-bold text-white">{sample.title}</h2>
                  <p className="text-xs text-gray-400">By {creator.name} ({creator.tag})</p>

                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">
                      Models & Frameworks
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sample.tools.map((t) => (
                        <span key={t} className="text-xs bg-[#0D0D0D] border border-white/10 px-2.5 py-1 rounded text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase block mb-1">
                      Prompt Archetype
                    </span>
                    <p className="bg-[#0D0D0D] p-3 rounded-lg border border-white/10 text-xs text-gray-300 italic font-mono">
                      "{sample.promptText}"
                    </p>
                  </div>

                  <div 
                    onClick={() => setShowClearance(true)}
                    className="bg-emerald-950/20 border border-emerald-800/40 p-3 rounded-lg flex items-center justify-between text-xs text-emerald-300 cursor-pointer hover:bg-emerald-950/40 transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>Commercial Clearance Verified: Safe for broadcast & packaging.</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-amber-500 group-hover:underline">
                      View Certificate &rarr;
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const subject = encodeURIComponent(`Production Inquiry: ${sample.title}`);
                    const body = encodeURIComponent(`Hi ${creator.name},\n\nI am interested in booking a production with you based on your workflow for "${sample.title}".\n\nPlease let me know your availability to discuss this further.\n\nThanks!`);
                    window.location.href = `mailto:${creator.email || 'creator@example.com'}?subject=${subject}&body=${body}`;
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-neonCyan to-neonPurple text-darkBg text-xs font-bold rounded-xl hover:opacity-95 transition"
                >
                  Book Production With This Workflow
                </button>
              </div>
            </div>
          )}

          {activeTab === "pipeline" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Visual Node Dependency Tree</h3>
                  <p className="text-xs text-gray-400">Verified generation trace executed by the creator.</p>
                </div>
                <span className="text-[11px] font-mono text-amber-500 border border-amber-500/30 bg-amber-500/10 px-2 py-1 rounded">
                  Status: 100% Reproducible
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative">
                {pipelineNodes.map((node, idx) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#0D0D0D] border border-white/10 rounded-xl p-3.5 flex flex-col justify-between relative group hover:border-amber-500 transition"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">
                            Node 0{idx + 1}
                          </span>
                          <Icon className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <h4 className="text-xs font-bold text-white mb-0.5">{node.title}</h4>
                        <span className="text-[10px] text-orange-500 font-medium block mb-2">{node.type}</span>
                      </div>
                      <div className="aura-vibe-card rounded p-2 text-[10px] text-gray-300 font-mono break-words">
                        {node.detail}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-4 space-y-2">
                <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider block">
                  Workflow Execution Notes
                </span>
                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                  {sample.pipeline}
                </p>
              </div>
            </div>
          )}
        </div>

        {showClearance && (
          <ClearanceModal
            sample={sample}
            creator={creator}
            onClose={() => setShowClearance(false)}
          />
        )}
      </div>
    </div>
  );
}