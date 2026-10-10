import React from "react";
import { BadgeCheck, ArrowUpRight } from "lucide-react";

export default function CreatorCard({ creator, onOpenWork, onMessage, onOpenProfile }) {
  return (
    <div className="aura-vibe-card p-6 flex flex-col justify-between group overflow-hidden">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div 
            className="flex items-center gap-3.5 cursor-pointer group/profile"
            onClick={() => onOpenProfile && onOpenProfile(creator)}
          >
            <div className="relative">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-14 h-14 rounded-2xl object-cover border border-white/15 shadow-md group-hover/profile:border-[#FF7B00]/50 transition"
              />
              {creator.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0D0D0D] flex items-center justify-center border border-white/10">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#FF7B00] fill-[#FF7B00]/20" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight group-hover/profile:text-[#FFD166] transition">
                {creator.name}
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">{creator.tag} &bull; {creator.city}</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-[#FF7B00]/20 border border-[#FF7B00]/40 text-[#FFD166] shadow-[0_0_15px_rgba(179,75,255,0.3)]">
            {creator.score}% Match
          </span>
        </div>

        <p className="text-xs text-gray-300 mb-4 leading-relaxed line-clamp-2">
          {creator.headline}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {creator.stack.map((item) => (
            <span
              key={item}
              className="text-[10px] bg-black/40 text-gray-300 border border-white/10 px-2.5 py-1 rounded-xl"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 mb-2.5">
            Verified Portfolios
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {creator.samples.map((sample) => (
              <div
                key={sample.id}
                onClick={() => onOpenWork(sample, creator)}
                className="group/thumb relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black/60 transition-all duration-300 hover:border-[#E63946]/70 hover:shadow-[0_0_25px_rgba(219,56,209,0.35)]"
              >
                <img
                  src={sample.thumb}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5 opacity-90 group-hover/thumb:opacity-100">
                  <span className="text-[10px] text-white truncate font-medium">{sample.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
        <span className="text-xs font-semibold text-gray-300 font-mono">{creator.rate}</span>
        <button
          onClick={() => onMessage(creator)}
          className="aura-button-spring text-xs font-semibold text-[#E63946] hover:text-[#FFD166] flex items-center gap-1"
        >
          <span>View Frequency Stack</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}