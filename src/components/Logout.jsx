import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "/src/supabaseClient.js";
import { LogOut } from "lucide-react";

export default function Logout() {
  const [status, setStatus] = useState("Signing out...");

  useEffect(() => {
    const performLogout = async () => {
      try {
        await supabase.auth.signOut();
        setStatus("You have been successfully signed out.");
      } catch (error) {
        setStatus("Error signing out. Please try again.");
      }
    };
    performLogout();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63946]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-md w-full aura-vibe-card p-10 text-center relative z-10 space-y-6">
        <div className="mx-auto w-16 h-16 rounded-[1.5rem] bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4">
          <LogOut className="w-6 h-6 text-[#E63946]" />
        </div>
        
        <h1 className="text-2xl font-bold">Disconnected</h1>
        <p className="text-gray-400">{status}</p>
        
        <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
          <Link
            to="/login"
            className="w-full py-3 bg-gradient-to-r from-[#FF7B00] to-[#E63946] text-white font-bold text-xs rounded-xl shadow-auraGlow hover:opacity-95 transition-all duration-300 hover:scale-[1.01] flex justify-center"
          >
            Return to Login
          </Link>
          <Link
            to="/"
            className="text-xs text-gray-500 hover:text-white transition"
          >
            Go to Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}
