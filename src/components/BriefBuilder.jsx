import React, { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { CONTENT_FORMATS, LICENSES, AI_MODELS, CONTENT_TYPES } from "../types";

const ASPECT_RATIOS = ["16:9 (Landscape)", "9:16 (Vertical)", "1:1 (Square)", "4:3 (Standard)", "Any"];
const STYLES = ["Photorealistic", "Anime / Manga", "3D Render", "Cinematic", "Illustration", "Any Style"];

export default function BriefBuilder({ onSave }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);
  const [format, setFormat] = useState(CONTENT_FORMATS[0]);
  const [license, setLicense] = useState(LICENSES[0]);
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [selectedTools, setSelectedTools] = useState([]);

  function handleAutoFormat() {
    if (!details.trim()) return;
    setTitle("Motion Campaign: " + details.slice(0, 24));
    setDetails(
      `Deliverable: ${details}. Output requires clean 4K masters, seed consistency, and complete commercial clearance buyouts.`
    );
  }

  function toggleTool(tool) {
    setSelectedTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !details) return;

    onSave({
      id: "b-" + Date.now(),
      client: "In-House Agency",
      title,
      budget,
      window: "14 days",
      contentType,
      format,
      aspectRatio,
      style,
      toolsNeeded: selectedTools,
      licenseType: license,
      details
    });

    setTitle("");
    setDetails("");
  }

  return (
    <div className="aura-vibe-card rounded-2xl p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white">Create Creative Brief</h2>
          <p className="text-[11px] text-gray-400">Define requirements, target models, and commercial terms.</p>
        </div>
        <button
          type="button"
          onClick={handleAutoFormat}
          className="text-xs text-amber-500 hover:underline flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" /> Auto-Polish Brief
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Campaign name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <textarea
            rows={3}
            placeholder="Write brief requirements, style references, scenes needed..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <input
            type="text"
            placeholder="Budget est."
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          />
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          >
            {CONTENT_TYPES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          >
            {CONTENT_FORMATS.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          >
            {ASPECT_RATIOS.map(ar => (
              <option key={ar} value={ar}>{ar}</option>
            ))}
          </select>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          >
            {STYLES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
          >
            {LICENSES.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-gray-400 uppercase font-semibold block mb-1.5">Required AI Tools</label>
          <div className="flex flex-wrap gap-1.5">
            {AI_MODELS.map(tool => (
              <button
                type="button"
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`text-[11px] px-2.5 py-1 rounded-md border transition ${
                  selectedTools.includes(tool)
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-[#0D0D0D] border-white/10 text-gray-400"
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-amber-500 text-darkBg text-xs font-bold rounded-lg hover:opacity-90 transition mt-2"
        >
          Post Brief & Match Creators
        </button>
      </form>
    </div>
  );
}

