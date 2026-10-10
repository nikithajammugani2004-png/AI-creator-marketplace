import React, { useState } from "react";
import { Sparkles, Compass, FileSpreadsheet, Layers, LogOut, PlusCircle, X, User, Menu } from "lucide-react";

export default function Header({ tab, setTab, viewMode, onToggleMode, onSignOut, user }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getUserInitials = () => {
    if (!user) return "?";
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "?";
  };
  
  const displayName = user?.user_metadata?.full_name || user?.email || "Creator";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-2xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <button 
              className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div
              className="flex items-center gap-3"
              onClick={() => setTab("explore")}
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF7B00] to-[#E63946] p-[1.5px] shadow-[0_0_20px_rgba(179,75,255,0.4)]">
                <div className="w-full h-full bg-[#0D0D0D] rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#E63946]" />
                </div>
              </div>
              <span className="font-extrabold tracking-wide text-white text-base hidden sm:inline-block">
                AI Creator Marketplace
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 bg-[#171321]/90 p-1.5 rounded-full border border-white/10 backdrop-blur-xl">
            {viewMode === "brand" && (
              <>
                <button
                  onClick={() => setTab("explore")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    tab === "explore"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50 shadow-[0_0_15px_rgba(179,75,255,0.3)]"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#FF7B00]" />
                  <span>Discover Talent</span>
                </button>
                <button
                  onClick={() => setTab("briefs")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    tab === "briefs"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50 shadow-[0_0_15px_rgba(179,75,255,0.3)]"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#E63946]" />
                  <span>Briefs & Matchmaker</span>
                </button>
                <button
                  onClick={() => setTab("workspace")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    tab === "workspace"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50 shadow-[0_0_15px_rgba(179,75,255,0.3)]"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
                  <span>Workspace</span>
                </button>
                <button
                  onClick={() => setTab("architecture")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    tab === "architecture"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50 shadow-[0_0_15px_rgba(179,75,255,0.3)]"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#FF7B00]" />
                  <span>Brand History</span>
                </button>
              </>
            )}

            {viewMode === "creator" && (
              <>
                <button
                  onClick={() => setTab("creator-briefs")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    tab === "creator-briefs"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50 shadow-[0_0_15px_rgba(179,75,255,0.3)]"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#E63946]" />
                  <span>Discover Open Campaigns</span>
                </button>
                <button
                  onClick={() => setTab("studio")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    tab === "studio"
                      ? "bg-gradient-to-r from-[#FF7B00] to-[#E63946] text-white shadow-auraGlow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Studio Upload</span>
                </button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">

            <div className="relative flex items-center pl-3 ml-1 border-l border-white/10">
              {/* Profile Bubble Trigger */}
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-9 h-9 rounded-full border border-white/10 object-cover shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF7B00] to-[#E63946] flex items-center justify-center text-sm font-bold text-white shadow-[0_0_10px_rgba(255,123,0,0.3)]">
                    {getUserInitials()}
                  </div>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-3 w-64 aura-vibe-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-white/5 bg-black/20">
                    <div className="flex items-center gap-3 mb-1">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF7B00] to-[#E63946] flex items-center justify-center text-sm font-bold text-white">
                          {getUserInitials()}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate">{displayName}</p>
                        <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    {viewMode === "creator" && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          setTab("creator-applications");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200 mb-1"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-[#FF7B00]" />
                        <span>My Applications</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
            {viewMode === "brand" && (
              <>
                <button
                  onClick={() => { setTab("explore"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    tab === "explore"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Compass className="w-5 h-5 text-[#FF7B00]" />
                  <span>Discover Talent</span>
                </button>
                <button
                  onClick={() => { setTab("briefs"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    tab === "briefs"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileSpreadsheet className="w-5 h-5 text-[#E63946]" />
                  <span>Briefs & Matchmaker</span>
                </button>
                <button
                  onClick={() => { setTab("workspace"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    tab === "workspace"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#FFD166]" />
                  <span>Workspace</span>
                </button>
                <button
                  onClick={() => { setTab("architecture"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    tab === "architecture"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Layers className="w-5 h-5 text-[#FF7B00]" />
                  <span>Brand History</span>
                </button>
              </>
            )}

            {viewMode === "creator" && (
              <>
                <button
                  onClick={() => { setTab("creator-briefs"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    tab === "creator-briefs"
                      ? "bg-gradient-to-r from-[#FF7B00]/30 to-[#E63946]/30 text-white border border-[#FF7B00]/50"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileSpreadsheet className="w-5 h-5 text-[#FF7B00]" />
                  <span>Briefs & Matchmaker</span>
                </button>
                <button
                  onClick={() => { setTab("studio"); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    tab === "studio"
                      ? "bg-gradient-to-r from-[#FF7B00] to-[#E63946] text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Studio Upload</span>
                </button>
              </>
            )}
          </nav>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm aura-vibe-card p-6 border border-white/10 rounded-2xl shadow-2xl text-center">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition bg-white/5 hover:bg-white/10 p-1.5 rounded-xl"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mx-auto w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">Sign Out</h3>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to sign out of your account? You will need to log in again to access your workspace.
            </p>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onSignOut();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-xs font-bold text-white hover:opacity-90 transition shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



 