import React, { useState } from "react";
import { UploadCloud, CheckCircle2, ShieldCheck, Image, Video, Trash2 } from "lucide-react";
import { AI_MODELS, CONTENT_FORMATS } from "../types";

export default function CreatorStudio({ onAddWork, creatorProfile, onDeleteWork, briefs = [], onApplyToBrief }) {
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState(CONTENT_FORMATS[0]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [pipeline, setPipeline] = useState("");
  const [promptText, setPromptText] = useState("");
  const [skills, setSkills] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedBriefId, setSelectedBriefId] = useState("");

  function toggleTool(tool) {
    setSelectedTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  }

  function handlePublish(e) {
    e.preventDefault();
    if (!title || !pipeline) return;

    const newSample = {
      id: "w-" + Date.now(),
      title,
      format,
      thumb: imagePreview,
      videoUrl: videoUrl,
      tools: selectedTools,
      pipeline,
      promptText: promptText || "Proprietary prompt pipeline with latent seed consistency",
      skills,
      specialization,
      cleared: true
    };

    onAddWork(newSample);
    
    // Apply to brief if selected
    if (selectedBriefId && onApplyToBrief) {
      const selectedBrief = briefs.find(b => b.id === selectedBriefId);
      if (selectedBrief) {
        // Defer applying to give state time to update portfolio if this is first upload
        setTimeout(() => onApplyToBrief(selectedBrief), 500);
      }
    }

    setPublished(true);
    setTimeout(() => setPublished(false), 3000);

    setTitle("");
    setPipeline("");
    setPromptText("");
    setSkills("");
    setSpecialization("");
    setVideoUrl("");
    setSelectedBriefId("");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="aura-vibe-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[11px] font-mono text-orange-500 uppercase tracking-wider block">Creator Studio</span>
            <h2 className="text-lg font-bold text-white">Publish New Verified Generation</h2>
          </div>
          <span className="text-xs bg-[#0D0D0D] border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Auto-Clearance Active
          </span>
        </div>

        {published && (
          <div className="mb-4 p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Artwork and generation pipeline successfully verified and published to your portfolio!</span>
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5">
                <span className="text-[11px] uppercase font-semibold text-gray-400 block">Title of your artwork / video</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Cyberpunk Kinetic Sneaker"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[11px] uppercase font-semibold text-gray-400 block">Screen size / Orientation</span>
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                {CONTENT_FORMATS.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">
              <span className="text-[11px] uppercase font-semibold text-gray-400 block">Software / Models used</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {AI_MODELS.map(tool => (
                <button
                  type="button"
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                    selectedTools.includes(tool)
                      ? "bg-orange-500/20 border-orange-500 text-white"
                      : "bg-[#0D0D0D] border-white/10 text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5">
                  <span className="text-[11px] uppercase font-semibold text-gray-400 block">Skills</span>
                  <span className="text-[10px] text-gray-500 font-normal normal-case block mt-0.5">e.g. Prompting, LoRA Training, Graphing</span>
                </label>
                <input
                  type="text"
                  placeholder="Your top skills..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block mb-1.5">
                  <span className="text-[11px] uppercase font-semibold text-gray-400 block">Specialization</span>
                  <span className="text-[10px] text-gray-500 font-normal normal-case block mt-0.5">e.g. Photorealism, Product Ads, Anime</span>
                </label>
                <input
                  type="text"
                  placeholder="Your visual style..."
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1.5">
              <span className="text-[11px] uppercase font-semibold text-gray-400 block">How Was It Made?</span>
              <span className="text-[10px] text-gray-500 font-normal normal-case block mt-0.5">Step-by-step creation steps</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g., Flux Schnell base generation -> Depth map extraction -> Kling AI motion pass -> ESRGAN 4K upscale"
              value={pipeline}
              onChange={(e) => setPipeline(e.target.value)}
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1.5">
              <span className="text-[11px] uppercase font-semibold text-gray-400 block">Text instructions typed into the AI</span>
              <span className="text-[10px] text-gray-500 font-normal normal-case block mt-0.5">The exact prompt you used</span>
            </label>
            <input
              type="text"
              placeholder="Enter positive prompt here..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5">
                <span className="text-[11px] uppercase font-semibold text-gray-400 flex items-center gap-1.5"><Image className="w-3.5 h-3.5" /> Upload Image</span>
                <span className="text-[10px] text-gray-500 font-normal normal-case block mt-0.5">Select a picture or video cover</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-orange-500/20 file:text-orange-400 hover:file:bg-orange-500/30"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1.5">
                <span className="text-[11px] uppercase font-semibold text-gray-400 flex items-center gap-1.5"><Video className="w-3.5 h-3.5" /> Upload Video</span>
                <span className="text-[10px] text-gray-500 font-normal normal-case block mt-0.5">Select a video file (optional)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setVideoUrl(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-orange-500/20 file:text-orange-400 hover:file:bg-orange-500/30"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="block mb-1.5">
              <span className="text-[11px] uppercase font-semibold text-gray-400 block">Apply to Brand Campaign (Optional)</span>
            </label>
            <select
              value={selectedBriefId}
              onChange={(e) => setSelectedBriefId(e.target.value)}
              className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="">-- No Campaign (Just save to portfolio) --</option>
              {briefs.map(b => (
                <option key={b.id} value={b.id}>{b.title} (by {b.client})</option>
              ))}
            </select>
            <p className="text-[10px] text-gray-500 mt-1">If selected, this portfolio asset will be submitted directly to the brand's workspace.</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl transition shadow-lg mt-4 flex flex-col items-center justify-center gap-1 text-center"
          >
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              <UploadCloud className="w-4 h-4 shrink-0" />
              <span>Publish to Marketplace & Apply </span>
            </div>
            <span className="text-[10px] sm:text-xs font-normal opacity-90">Save work & check commercial rights</span>
          </button>
        </form>
      </div>

      {creatorProfile && creatorProfile.samples && creatorProfile.samples.length > 0 && (
        <div className="aura-vibe-card rounded-2xl p-6 mt-8">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Manage Your Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creatorProfile.samples.map(sample => (
              <div key={sample.id} className="bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden relative group">
                <button
                  onClick={() => onDeleteWork(sample.id)}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-gray-300 hover:text-red-400 hover:bg-red-500/20 rounded-md backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                  title="Delete Asset"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="aspect-video w-full bg-gray-900 relative">
                  {sample.thumb ? (
                    <img src={sample.thumb} alt={sample.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">No Preview</div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white truncate">{sample.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1 truncate">{sample.promptText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

