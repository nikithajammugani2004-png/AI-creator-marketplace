import React, { useState } from "react";
import { X, Star, BadgeCheck, Briefcase, MapPin, Sparkles, Image as ImageIcon } from "lucide-react";

export default function CreatorProfileModal({ creator, onClose, onOpenWork }) {
  const [activeTab, setActiveTab] = useState("portfolio");

  if (!creator) return null;

  const mockReviews = [
    { client: "Nike Studio", rating: 5, text: "Incredible attention to detail with the Midjourney V6 outputs. Delivered the exact style we needed for our fall campaign.", date: "2 weeks ago" },
    { client: "Ogilvy & Mather", rating: 5, text: "The workflow graph provided gave our legal team full confidence in commercial clearance. Highly reproducible.", date: "1 month ago" },
    { client: "Indie Films Co.", rating: 4.8, text: "Great Runway Gen-3 animations. Fast turnaround and extremely communicative.", date: "2 months ago" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/50 border border-white/10 text-gray-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Section */}
        <div className="relative p-8 overflow-hidden bg-gradient-to-r from-[#1a0a2e] to-[#0D0D0D] border-b border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7B00]/10 rounded-full blur-[100px]" />
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative shrink-0">
              <img src={creator.avatar} alt={creator.name} className="w-24 h-24 rounded-3xl object-cover border-2 border-white/10 shadow-xl" />
              {creator.isVerified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#0D0D0D] flex items-center justify-center border border-white/10 shadow-lg">
                  <BadgeCheck className="w-5 h-5 text-emerald-400" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-white flex items-center justify-center md:justify-start gap-3">
                {creator.name}
                <span className="text-sm px-3 py-1 bg-[#FF7B00]/20 text-[#FF7B00] border border-[#FF7B00]/30 rounded-full font-mono">{creator.score || 99}% Match</span>
              </h1>
              <p className="text-gray-400 mt-2 font-medium">{creator.headline}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-xs text-gray-500 font-semibold">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> {creator.city || "Global"}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-400" /> {creator.jobsCompleted || 14} Campaigns Completed</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400" /> {(creator.rating || 4.9).toFixed(1)} Average Rating</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold rounded-xl hover:opacity-90 transition shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                Invite to Campaign
              </button>
              <button className="px-6 py-3 bg-[#1A1A1A] text-white border border-white/10 font-bold rounded-xl hover:bg-[#2A2A2A] transition">
                Direct Message
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#141414] px-8 pt-4 gap-8">
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
              activeTab === "portfolio" ? "border-[#FF7B00] text-white" : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Aggregated Portfolio
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
              activeTab === "reviews" ? "border-amber-400 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <Star className="w-4 h-4" />
            Client Reviews
          </button>
          <button
            onClick={() => setActiveTab("stack")}
            className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
              activeTab === "stack" ? "border-emerald-400 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Verified Tool Stack
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-8 flex-1 bg-[#0D0D0D]">
          {activeTab === "portfolio" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creator.samples.map((sample) => (
                <div 
                  key={sample.id} 
                  onClick={() => onOpenWork(sample, creator)}
                  className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/10 bg-black hover:border-[#FF7B00]/70 transition-all"
                >
                  <img src={sample.thumb} alt={sample.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4">
                    <div>
                      <span className="text-[10px] text-[#FF7B00] uppercase font-bold tracking-wider mb-1 block">{sample.format}</span>
                      <h3 className="text-sm text-white font-bold truncate">{sample.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-lg font-bold text-white mb-6">Historical Agency Feedback</h3>
              {mockReviews.map((review, i) => (
                <div key={i} className="bg-[#141414] border border-white/10 p-5 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center font-bold text-xs">{review.client.charAt(0)}</div>
                      <span className="font-bold text-gray-200">{review.client}</span>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-3.5 h-3.5 ${idx < Math.floor(review.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stack" && (
            <div className="max-w-3xl space-y-6">
              <h3 className="text-lg font-bold text-white">Verified Pipelines & Software</h3>
              <p className="text-sm text-gray-400">The creator has proven commercial clearance proficiency in the following tools based on historical graph validations.</p>
              
              <div className="flex flex-wrap gap-3 mt-4">
                {creator.stack.map(tool => (
                  <div key={tool} className="bg-[#141414] border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl flex flex-col gap-1">
                    <span className="font-bold text-sm">{tool}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">Auto-Clearance Supported</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-white mt-8 border-t border-white/10 pt-8">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {creator.tags.map(tag => (
                  <span key={tag} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
