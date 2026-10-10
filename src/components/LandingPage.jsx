import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage({ onEnterApp }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic Background Light-Leaks & Aura Spheres */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#FF7B00]/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] bg-[#E63946]/20 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-[#FF7B00]/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Navbar */}
      <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-[#0D0D0D]/60 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF7B00] to-[#E63946] p-[1.5px] shadow-[0_0_20px_rgba(179,75,255,0.4)]">
            <div className="w-full h-full bg-[#0D0D0D] rounded-2xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#E63946]" />
            </div>
          </div>
          <span className="font-bold tracking-wider text-base text-white">
            AI Creator Marketplace
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            onClick={() => {
              localStorage.setItem('viewMode', 'brand');
              localStorage.setItem('currentTab', 'explore');
            }}
            className="text-xs font-semibold px-4 py-2 rounded-xl text-gray-300 hover:text-white transition"
          >
            Brand Login
          </Link>
          <Link
            to="/login"
            onClick={() => {
              localStorage.setItem('viewMode', 'creator');
              localStorage.setItem('currentTab', 'creator-briefs');
            }}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition backdrop-blur-md hover:border-[#FF7B00]/40"
          >
            Creator Portal
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] text-[#FFD166] border border-[#FF7B00]/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(179,75,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
          <span>Next-Gen Aura Marketplace</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl text-white mb-6">
          Hire Verified AI Creators With{" "}
          <span className="bg-gradient-to-r from-[#FF7B00] via-[#E63946] to-[#FFD166] bg-clip-text text-transparent">
            Reproducible Workflows
          </span>
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mb-10 leading-relaxed font-normal">
          Publish creative briefs, evaluate verifiable ComfyUI node graphs and checkpoint weights, and automate commercial rights clearances in an ethereal space.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/login"
            onClick={() => {
              localStorage.setItem('viewMode', 'brand');
              localStorage.setItem('currentTab', 'explore');
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF7B00] to-[#E63946] text-white font-bold text-xs tracking-wide shadow-auraGlow hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>Launch As Brand</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            onClick={() => {
              localStorage.setItem('viewMode', 'creator');
              localStorage.setItem('currentTab', 'creator-briefs');
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-semibold text-xs tracking-wide transition-all duration-300 backdrop-blur-md hover:border-[#E63946]/40"
          >
            Enter As Creator
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-20 w-full">
          <div className="aura-glass aura-glass-hover rounded-3xl p-6 relative overflow-hidden group">
            <div className="w-10 h-10 rounded-2xl bg-[#FF7B00]/10 border border-[#FF7B00]/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#FF7B00]" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1.5">Commercial Clearance</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Automated audit badges checking base models, LoRA checkpoints, and royalty-free stems for enterprise buyout safety.
            </p>
          </div>

          <div className="aura-glass aura-glass-hover rounded-3xl p-6 relative overflow-hidden group">
            <div className="w-10 h-10 rounded-2xl bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5 text-[#E63946]" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1.5">Verifiable Node Trees</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Inspect exact ComfyUI execution graphs, seeds, and upscaler nodes instead of blind prompt guesses.
            </p>
          </div>

          <div className="aura-glass aura-glass-hover rounded-3xl p-6 relative overflow-hidden group">
            <div className="w-10 h-10 rounded-2xl bg-[#FF7B00]/10 border border-[#FF7B00]/20 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-[#FFD166]" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1.5">AI Matchmaker Engine</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Convert raw campaign ideas into technical creative briefs matched with top-rated AI talent automatically.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-6 text-center text-xs text-gray-500">
        AI Creator Marketplace &copy; 2026. All rights reserved.
      </footer>

    </div>
  );
}