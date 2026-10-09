import React from "react";
import BriefBuilder from "./BriefBuilder";
import { ChevronRight, Sparkles, CheckCircle2, Trash2 } from "lucide-react";

export default function BriefsView({ briefs, creators, onPublishBrief, onDeleteBrief, onSelectCreator }) {
    const calculateBriefScore = (creator, brief) => {
        let score = 50;
        const toolMatches = brief.toolsNeeded.filter((tool) => creator.stack.includes(tool));
        score += (toolMatches.length / Math.max(brief.toolsNeeded.length, 1)) * 35;
        if (creator.isVerified) score += 15;
        return Math.min(Math.round(score), 99);
    };

    return (
        <div className="space-y-6">
            <BriefBuilder onSave={onPublishBrief} />

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Active Postings & Dynamic Match Results
                </h3>

                {briefs.length === 0 && (
                    <div className="text-center py-10 aura-vibe-card border border-white/10 rounded-2xl">
                        <p className="text-gray-400 text-sm">No briefs published yet. Create one above!</p>
                    </div>
                )}

                {briefs.map((brief) => {
                    const sortedMatches = [...creators]
                        .map((c) => ({
                            ...c,
                            dynamicScore: calculateBriefScore(c, brief),
                        }))
                        .sort((a, b) => b.dynamicScore - a.dynamicScore);

                    const realMatches = sortedMatches.filter(c => (c.aiProbability || 85) >= 80);
                    const fakeMatches = sortedMatches.filter(c => (c.aiProbability || 85) < 80);

                    return (
                        <div key={brief.id} className="aura-vibe-card rounded-2xl p-5 space-y-3 relative group/card">
                            <button
                                onClick={() => onDeleteBrief(brief.id)}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg opacity-0 group-hover/card:opacity-100 transition-all duration-300 z-10"
                                title="Remove Brief"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/10 pb-3 pr-10">
                                <div>
                                    <span className="text-[11px] font-mono text-amber-500">{brief.client}</span>
                                    <h4 className="font-bold text-white text-base">{brief.title}</h4>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                    <span className="bg-[#0D0D0D] border border-white/10 px-2 py-1 rounded text-gray-300 font-mono">
                                        {brief.budget}
                                    </span>
                                    <span className="bg-[#0D0D0D] border border-white/10 px-2 py-1 rounded text-gray-300">
                                        {brief.aspectRatio || "Any Ratio"}
                                    </span>
                                    <span className="bg-[#0D0D0D] border border-white/10 px-2 py-1 rounded text-gray-300">
                                        {brief.style || "Any Style"}
                                    </span>
                                    <span className="bg-[#0D0D0D] border border-white/10 px-2 py-1 rounded text-emerald-400 font-bold">
                                        {brief.licenseType}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs text-gray-300 leading-relaxed">{brief.details}</p>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Authentic Applicants ({realMatches.length})
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                        {realMatches.length > 0 ? realMatches.map((creator) => (
                                            <div
                                                key={creator.id}
                                                onClick={() => onSelectCreator(creator.samples[0], creator)}
                                                className="bg-[#0D0D0D] border border-emerald-500/30 hover:border-emerald-500 cursor-pointer rounded-xl p-2.5 flex items-center justify-between transition group relative overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded-bl">
                                                    AUTHENTIC
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-lg object-cover" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-white leading-tight group-hover:text-emerald-400 transition">
                                                            {creator.name}
                                                        </p>
                                                        <span className="text-[10px] text-amber-500 font-mono">{creator.dynamicScore}% Match</span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition" />
                                            </div>
                                        )) : (
                                            <p className="text-xs text-gray-500 italic">No authentic matches found.</p>
                                        )}
                                    </div>
                                </div>

                                {fakeMatches.length > 0 && (
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-red-400 font-bold mb-2 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            Flagged/Suspicious Applicants ({fakeMatches.length})
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 opacity-75 grayscale-[50%] hover:grayscale-0 hover:opacity-100 transition-all">
                                            {fakeMatches.map((creator) => (
                                                <div
                                                    key={creator.id}
                                                    onClick={() => onSelectCreator(creator.samples[0], creator)}
                                                    className="bg-[#0D0D0D] border border-red-500/30 hover:border-red-500 cursor-pointer rounded-xl p-2.5 flex items-center justify-between transition group relative overflow-hidden"
                                                >
                                                    <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-[8px] font-bold px-1.5 py-0.5 rounded-bl">
                                                        FLAGGED
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-lg object-cover" />
                                                        <div>
                                                            <p className="text-xs font-semibold text-white leading-tight group-hover:text-red-400 transition">
                                                                {creator.name}
                                                            </p>
                                                            <span className="text-[10px] text-amber-500 font-mono">{creator.dynamicScore}% Match</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}