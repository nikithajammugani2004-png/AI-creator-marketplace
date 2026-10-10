import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CreatorCard from "./components/CreatorCard";
import PortfolioModal from "./components/PortfolioModal";
import CreatorProfileModal from "./components/CreatorProfileModal";
import BriefsView from "./components/BriefsView";
import EngagementWorkspace from "./components/EngagementWorkspace";
import CreatorStudio from "./components/CreatorStudio";
import DataModelViewer from "./components/DataModelViewer";
import LandingPage from "./components/LandingPage";
import { AI_MODELS, CONTENT_TYPES, CONTENT_FORMATS, DOMAINS, REGIONS, AVAILABILITIES, FLEXIBILITIES } from "./types";
import { Search, Sparkles, CheckCircle, Filter, ArrowLeft, X } from "lucide-react";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import { supabase } from "./supabaseClient";
import { dummyCreators, dummyBriefs } from "./dummyData";



import ChatAssistant from "./components/ChatAssistant";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [tab, setTab] = useState(localStorage.getItem("currentTab") || "explore");
  const [tabHistory, setTabHistory] = useState([]);
  const [viewMode, setViewMode] = useState(localStorage.getItem("viewMode") || "brand");
  const [creators, setCreators] = useState([]);
  const [briefs, setBriefs] = useState([]);

  // Creator Filters
  const [search, setSearch] = useState("");
  const [toolFilter, setToolFilter] = useState("All");
  const [verifiedFilter, setVerifiedFilter] = useState(false);
  const [domainFilter, setDomainFilter] = useState("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [flexibilityFilter, setFlexibilityFilter] = useState("All");
  
  // Brief Filters
  const [briefTypeFilter, setBriefTypeFilter] = useState("All");
  const [briefFormatFilter, setBriefFormatFilter] = useState("All");
  const [briefDomainFilter, setBriefDomainFilter] = useState("All");
  const [briefRegionFilter, setBriefRegionFilter] = useState("All");
  const [briefAvailabilityFilter, setBriefAvailabilityFilter] = useState("All");
  const [briefFlexibilityFilter, setBriefFlexibilityFilter] = useState("All");
  const [activeModal, setActiveModal] = useState(null);
  const [activeProfileModal, setActiveProfileModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showNotification = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setIsAuthenticated(true);
      }
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch from Supabase Database
  useEffect(() => {
    async function loadDatabase() {
      const { data: dbCreators } = await supabase.from('creators').select('*');
      if (dbCreators && dbCreators.length > 0) {
        const mappedCreators = dbCreators.map(c => ({
          ...c,
          aiProbability: c.aiprobability,
          isVerified: c.isverified,
          jobsCompleted: c.jobscompleted
        }));
        setCreators([...dummyCreators, ...mappedCreators]);
      } else {
        setCreators(dummyCreators); // Fallback to dummy data
      }

      const { data: dbBriefs } = await supabase.from('briefs').select('*');
      if (dbBriefs && dbBriefs.length > 0) {
        const mappedBriefs = dbBriefs.map(b => ({
          ...b,
          contentType: b.contenttype,
          aspectRatio: b.aspectratio,
          toolsNeeded: b.toolsneeded,
          licenseType: b.licensetype
        }));
        setBriefs([...dummyBriefs, ...mappedBriefs]);
      } else {
        setBriefs(dummyBriefs); // Fallback to dummy data
      }
    }
    loadDatabase();
  }, []);

  const navigate = useNavigate();

  const changeTab = (newTab) => {
    if (newTab !== tab) {
      setTabHistory(prev => [...prev, tab]);
      setTab(newTab);
      localStorage.setItem("currentTab", newTab);
    }
  };

  const handleBack = () => {
    if (tabHistory.length > 0) {
      const newHistory = [...tabHistory];
      const previousTab = newHistory.pop();
      setTabHistory(newHistory);
      setTab(previousTab);
      localStorage.setItem("currentTab", previousTab);
    } else if (viewMode !== null) {
      setViewMode(null);
      localStorage.removeItem("viewMode");
    } else {
      handleSignOut();
    }
  };

  const handleLogin = (selectedRole) => {
    setViewMode(selectedRole);
    localStorage.setItem("viewMode", selectedRole);
    const initialTab = selectedRole === "creator" ? "creator-briefs" : "explore";
    setTabHistory([]);
    setTab(initialTab);
    localStorage.setItem("currentTab", initialTab);
    showNotification(`Connected to ${selectedRole.toUpperCase()} Aura space.`);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    localStorage.removeItem("viewMode");
    localStorage.removeItem("currentTab");
    setTabHistory([]);
    showNotification("Disconnected.");
    navigate("/logout");
  };

  const handleToggleMode = () => {
    const nextMode = viewMode === "brand" ? "creator" : "brand";
    setViewMode(nextMode);
    localStorage.setItem("viewMode", nextMode);
    const initialTab = nextMode === "creator" ? "creator-briefs" : "explore";
    setTabHistory([]);
    setTab(initialTab);
    localStorage.setItem("currentTab", initialTab);
    showNotification(`Switched to ${nextMode.toUpperCase()} mode.`);
  };

  const handleAddSample = (newSample) => {
    let authenticityScore = 50; 
    if (newSample.skills && newSample.skills.split(',').length >= 2) authenticityScore += 15;
    if (newSample.tools && newSample.tools.length >= 2) authenticityScore += 15;
    if (newSample.prompt && newSample.prompt.length > 30) authenticityScore += 10;
    if (newSample.image || newSample.videoUrl) authenticityScore += 10;
    authenticityScore = Math.min(authenticityScore, 99);

    setCreators((prevCreators) => {
      const currentEmail = session?.user?.email || "creator@synth.ai";
      const existingIndex = prevCreators.findIndex(c => c.email === currentEmail);
      
      if (existingIndex >= 0) {
        const updated = [...prevCreators];
        const updatedProfile = {
          ...updated[existingIndex],
          samples: [newSample, ...updated[existingIndex].samples],
          aiProbability: authenticityScore
        };
        updated[existingIndex] = updatedProfile;

        // DB Mapping
        const dbProfile = { ...updatedProfile, aiprobability: updatedProfile.aiProbability, isverified: updatedProfile.isVerified, jobscompleted: updatedProfile.jobsCompleted };
        delete dbProfile.aiProbability; delete dbProfile.isVerified; delete dbProfile.jobsCompleted;
        supabase.from('creators').upsert(dbProfile).then();

        return updated;
      } else {
        const newProfile = {
          id: String(Date.now()),
          name: session?.user?.user_metadata?.full_name || currentEmail.split('@')[0],
          email: currentEmail,
          headline: newSample.specialization || "Verified AI Creator",
          avatar: session?.user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
          rating: 0,
          jobsCompleted: 0,
          stack: newSample.tools,
          tags: newSample.skills ? newSample.skills.split(',').map(s => s.trim()) : ["AI Art", "Generative"],
          isVerified: true,
          aiProbability: authenticityScore,
          samples: [newSample]
        };

        // DB Mapping
        const dbProfile = { ...newProfile, aiprobability: newProfile.aiProbability, isverified: newProfile.isVerified, jobscompleted: newProfile.jobsCompleted };
        delete dbProfile.aiProbability; delete dbProfile.isVerified; delete dbProfile.jobsCompleted;
        supabase.from('creators').insert(dbProfile).then();

        return [newProfile, ...prevCreators];
      }
    });
    showNotification("New frequency asset published to marketplace.");
  };

  const handleDeleteWork = (sampleId) => {
    setCreators(prev => {
      const updated = prev.map(c => {
        if (c.email === (session?.user?.email || "creator@synth.ai")) {
          const updatedProfile = { ...c, samples: c.samples.filter(s => s.id !== sampleId) };

          const dbProfile = { ...updatedProfile, aiprobability: updatedProfile.aiProbability, isverified: updatedProfile.isVerified, jobscompleted: updatedProfile.jobsCompleted };
          delete dbProfile.aiProbability; delete dbProfile.isVerified; delete dbProfile.jobsCompleted;
          supabase.from('creators').upsert(dbProfile).then();

          return updatedProfile;
        }
        return c;
      });
      return updated;
    });
    showNotification("Asset removed from portfolio.");
  };

  const handlePublishBrief = (newBrief) => {
    const briefRecord = { ...newBrief, id: String(Date.now()) };
    
    const dbBrief = { ...briefRecord, contenttype: briefRecord.contentType, aspectratio: briefRecord.aspectRatio, toolsneeded: briefRecord.toolsNeeded, licensetype: briefRecord.licenseType };
    delete dbBrief.contentType; delete dbBrief.aspectRatio; delete dbBrief.toolsNeeded; delete dbBrief.licenseType;
    supabase.from('briefs').insert(dbBrief).then();
    
    setBriefs((prev) => [briefRecord, ...prev]);
    showNotification(`Brief "${newBrief.title}" manifested.`);
  };

  const handleDeleteBrief = (id) => {
    supabase.from('briefs').delete().eq('id', id).then();
    setBriefs((prev) => prev.filter(b => b.id !== id));
    showNotification("Brief removed from workspace.");
  };

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.headline.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesTool = toolFilter === "All" || c.stack.includes(toolFilter);
    const matchesVerified = !verifiedFilter || c.isVerified;
    
    // Using string matching / includes for flexibility if data is structured differently
    const matchesDomain = domainFilter === "All" || (c.domain && c.domain.includes(domainFilter));
    const matchesRegion = regionFilter === "All" || (c.region && c.region.includes(regionFilter));
    const matchesAvailability = availabilityFilter === "All" || (c.availability && c.availability.includes(availabilityFilter));
    const matchesFlexibility = flexibilityFilter === "All" || (c.flexibility && c.flexibility.includes(flexibilityFilter));

    return matchesSearch && matchesTool && matchesVerified && matchesDomain && matchesRegion && matchesAvailability && matchesFlexibility;
  });

  const filteredBriefs = briefs.filter((b) => {
    const matchesType = briefTypeFilter === "All" || b.contentType === briefTypeFilter;
    const matchesFormat = briefFormatFilter === "All" || b.format === briefFormatFilter;
    
    // Hide briefs the creator has applied to if they are just browsing open campaigns
    const creatorEmail = session?.user?.email || "creator@synth.ai";
    const hasApplied = b.applications && b.applications.some(a => a.creatorEmail === creatorEmail);
    
    if (tab === "creator-briefs" && hasApplied) {
      return false; // Disappear after submitting
    }
    
    if (tab === "creator-applications" && !hasApplied) {
      return false; // Only show applied
    }

    const matchesDomain = briefDomainFilter === "All" || (b.domain && b.domain.includes(briefDomainFilter));
    const matchesRegion = briefRegionFilter === "All" || (b.region && b.region.includes(briefRegionFilter));
    const matchesAvailability = briefAvailabilityFilter === "All" || (b.availability && b.availability.includes(briefAvailabilityFilter));
    const matchesFlexibility = briefFlexibilityFilter === "All" || (b.flexibility && b.flexibility.includes(briefFlexibilityFilter));

    return matchesType && matchesFormat && matchesDomain && matchesRegion && matchesAvailability && matchesFlexibility;
  });

  const handleApplyToBrief = (brief) => {
    const creatorEmail = session?.user?.email || "creator@synth.ai";
    const creatorProfile = creators.find(c => c.email === creatorEmail);
    if (!creatorProfile) {
      showNotification("Please upload a portfolio sample in Studio Upload first to apply!");
      return;
    }
    
    if (brief.applications && brief.applications.find(a => a.creatorEmail === creatorEmail)) {
      showNotification("You have already applied to this campaign.");
      return;
    }

    const newApplication = {
      creatorId: creatorProfile.id,
      creatorName: creatorProfile.name,
      creatorEmail: creatorProfile.email,
      status: "pending",
      date: new Date().toISOString()
    };
    
    const updatedBrief = {
      ...brief,
      applications: [...(brief.applications || []), newApplication]
    };
    
    const dbBrief = { ...updatedBrief, contenttype: updatedBrief.contentType, aspectratio: updatedBrief.aspectRatio, toolsneeded: updatedBrief.toolsNeeded, licensetype: updatedBrief.licenseType };
    delete dbBrief.contentType; delete dbBrief.aspectRatio; delete dbBrief.toolsNeeded; delete dbBrief.licenseType;
    supabase.from('briefs').upsert(dbBrief).then();
    
    setBriefs(prev => prev.map(b => b.id === brief.id ? updatedBrief : b));
    showNotification("Application successfully sent to the brand!");
  };

  const renderBackButton = () => (
    <button
      onClick={handleBack}
      className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] text-gray-300 hover:text-white hover:scale-110 transition flex items-center justify-center"
      title="Go Back"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );

  const renderRoleSelection = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      {renderBackButton()}
      <div className="max-w-3xl w-full relative bg-[#171321]/40 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        <button
          onClick={() => handleSignOut()}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
          title="Discard and return to landing page"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7B00]/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="relative z-10 text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Welcome to the Platform</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">Select your account type to configure your dashboard. You can always switch modes later from your profile.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <button 
            onClick={() => handleLogin("creator")}
            className="aura-vibe-card p-8 rounded-[2rem] hover:scale-105 transition-all text-left group border border-white/10 hover:border-[#FF7B00]/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF7B00] to-[#E63946] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,123,0,0.4)]">
               <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FF7B00] transition">AI Content Creator</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">Upload your portfolio with detailed tool workflows, skills, and specializations. Discover and apply to briefs posted by top brands.</p>
            <span className="text-xs font-bold text-[#FF7B00] flex items-center gap-2 uppercase tracking-wider">
              Enter Creator Space &rarr;
            </span>
          </button>

          <button 
            onClick={() => handleLogin("brand")}
            className="aura-vibe-card p-8 rounded-[2rem] hover:scale-105 transition-all text-left group border border-white/10 hover:border-[#E63946]/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E63946] to-[#b34bff] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(230,57,70,0.4)]">
               <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#E63946] transition">Brand & Agency</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">Define campaign requirements, aspect ratios, and commercial needs. Evaluate verified AI creator portfolios and manage full engagements.</p>
            <span className="text-xs font-bold text-[#E63946] flex items-center gap-2 uppercase tracking-wider">
              Enter Brand Space &rarr;
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    if (!viewMode) return renderRoleSelection();
    
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white selection:bg-[#FF7B00] selection:text-white relative overflow-x-hidden">
        <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-[#FF7B00]/20 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-[#E63946]/20 rounded-full blur-[180px] pointer-events-none" />

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 aura-vibe-card px-4 py-3 shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-[#E63946] shrink-0" />
            <span className="text-xs font-medium">{toast}</span>
          </div>
        )}

        <Header
          tab={tab}
          setTab={changeTab}
          viewMode={viewMode}
          onToggleMode={handleToggleMode}
          onSignOut={handleSignOut}
          user={session?.user}
        />

        <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          {tab === "studio" && (
            <CreatorStudio 
              onAddWork={handleAddSample} 
              creatorProfile={creators.find(c => c.email === (session?.user?.email || "creator@synth.ai"))}
              onDeleteWork={handleDeleteWork}
              briefs={briefs}
              onApplyToBrief={handleApplyToBrief}
            />
          )}

          {tab === "explore" && (
            <div className="space-y-6">
              {/* Aurora Hero Banner */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 p-8 sm:p-12 shadow-2xl bg-[#0D0D0D]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1f0e33] to-[#2e0e3d] opacity-90" />
                <div className="absolute -top-24 -left-12 w-96 h-96 bg-[#FF7B00]/35 rounded-full blur-[110px] pointer-events-none" />
                <div className="absolute -bottom-20 -right-10 w-[420px] h-[420px] bg-[#E63946]/35 rounded-full blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-[#FFD166] border border-white/15 backdrop-blur-md shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
                    <span>AI Creator Marketplace</span>
                  </span>

                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Verify & Commission Elite AI Filmmakers and Artists
                  </h1>

                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                    Inspect prompt seeds, node pipeline graphs, model weights, and commercial copyright clearance before starting production.
                  </p>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between aura-vibe-card p-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search styles, artists, tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF7B00] transition"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full md:flex-1 md:justify-end">
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">All Domains</option>
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">All Regions</option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">Availability</option>
                    {AVAILABILITIES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>

                  <select
                    value={flexibilityFilter}
                    onChange={(e) => setFlexibilityFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">Flexibility</option>
                    {FLEXIBILITIES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>

                  <select
                    value={toolFilter}
                    onChange={(e) => setToolFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">All Pipelines</option>
                    {AI_MODELS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => setVerifiedFilter(!verifiedFilter)}
                    className={`text-xs px-3 py-2.5 rounded-2xl border transition whitespace-nowrap ${
                      verifiedFilter
                        ? "bg-[#FF7B00]/25 border-[#FF7B00] text-[#FFD166] shadow-[0_0_20px_rgba(179,75,255,0.4)]"
                        : "bg-[#0D0D0D] border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    Verified Only
                  </button>
                </div>
              </div>

              {/* Segregated Creators Grid */}
              <div className="space-y-10">
                {/* Real Accounts */}
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-emerald-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <h2 className="text-lg font-bold text-emerald-400">AI Verified Authentic Accounts</h2>
                    </div>
                    <p className="text-xs text-gray-400 ml-7 mt-1">Evaluated securely via Google Trust Data based on portfolio work, tool proficiency, and experience.</p>
                  </div>
                  {filteredCreators.filter(c => (c.aiProbability || 85) >= 80).length === 0 ? (
                    <p className="text-sm text-gray-500">No verified authentic accounts found.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCreators.filter(c => (c.aiProbability || 85) >= 80).map((creator) => (
                        <div key={creator.id} className="relative group/real">
                          <CreatorCard
                            creator={creator}
                            onOpenWork={(sample, cr) => setActiveModal({ sample, creator: cr })}
                            onMessage={(cr) => setActiveModal({ sample: cr.samples[0], creator: cr })}
                            onOpenProfile={(cr) => setActiveProfileModal(cr)}
                          />
                          <div className="absolute top-4 right-4 bg-emerald-500 text-darkBg text-[10px] font-bold px-2 py-1 rounded shadow-lg z-20">
                            AUTHENTIC
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fake/Flagged Accounts */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-red-500/20 pb-2">
                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <h2 className="text-lg font-bold text-red-500">Flagged Fake / Suspicious</h2>
                  </div>
                  {filteredCreators.filter(c => (c.aiProbability || 85) < 80).length === 0 ? (
                    <p className="text-sm text-gray-500">No suspicious accounts detected.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75 grayscale-[50%] hover:grayscale-0 hover:opacity-100 transition-all">
                      {filteredCreators.filter(c => (c.aiProbability || 85) < 80).map((creator) => (
                        <div key={creator.id} className="relative group/fake">
                          <div className="absolute inset-0 border-2 border-red-500/40 rounded-2xl pointer-events-none z-10" />
                          <CreatorCard
                            creator={creator}
                            onOpenWork={(sample, cr) => setActiveModal({ sample, creator: cr })}
                            onMessage={(cr) => setActiveModal({ sample: cr.samples[0], creator: cr })}
                            onOpenProfile={(cr) => setActiveProfileModal(cr)}
                          />
                          <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg z-20">
                            FLAGGED
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "briefs" && (
            <div className="max-w-4xl mx-auto">
              <BriefsView
                briefs={briefs}
                creators={creators}
                onPublishBrief={handlePublishBrief}
                onDeleteBrief={handleDeleteBrief}
                onSelectCreator={(sample, cr) => setActiveModal({ sample, creator: cr })}
              />
            </div>
          )}

          {tab === "creator-briefs" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 p-8 shadow-2xl bg-[#0D0D0D]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#2e1700] to-[#3d0e0e] opacity-90" />
                <div className="relative z-10 max-w-2xl space-y-4">
                  <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
                    Discover Open Campaigns & Briefs
                  </h1>
                  <p className="text-sm text-gray-300 leading-relaxed font-normal">
                    Apply your unique AI workflows and specialized skills to complete products, advertisements, and promotions posted by top brands and agencies.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between aura-vibe-card p-4">
                <div className="flex items-center gap-2 w-full md:w-auto text-sm text-gray-400 font-semibold">
                  <Filter className="w-4 h-4" /> Filter Briefs:
                </div>
                <div className="flex flex-wrap items-center gap-2.5 w-full md:flex-1 md:justify-end">
                  <select
                    value={briefDomainFilter}
                    onChange={(e) => setBriefDomainFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">All Domains</option>
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <select
                    value={briefRegionFilter}
                    onChange={(e) => setBriefRegionFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">All Regions</option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  
                  <select
                    value={briefAvailabilityFilter}
                    onChange={(e) => setBriefAvailabilityFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">Availability</option>
                    {AVAILABILITIES.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>

                  <select
                    value={briefFlexibilityFilter}
                    onChange={(e) => setBriefFlexibilityFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">Flexibility</option>
                    {FLEXIBILITIES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>

                  <select
                    value={briefTypeFilter}
                    onChange={(e) => setBriefTypeFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">All Content Types</option>
                    {CONTENT_TYPES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <select
                    value={briefFormatFilter}
                    onChange={(e) => setBriefFormatFilter(e.target.value)}
                    className="bg-[#0D0D0D] border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-gray-300 focus:outline-none focus:border-[#FF7B00]"
                  >
                    <option value="All">All Formats</option>
                    {CONTENT_FORMATS.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid gap-4">
                {filteredBriefs.length === 0 ? (
                  <div className="text-center py-10 aura-vibe-card border border-white/10 rounded-2xl">
                    <p className="text-gray-400 text-sm">No active campaigns match your filters at the moment.</p>
                  </div>
                ) : (
                  filteredBriefs.map((brief) => (
                    <div key={brief.id} className="aura-vibe-card rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[11px] font-mono text-amber-500 block mb-1">{brief.client}</span>
                          <h3 className="text-lg font-bold text-white">{brief.title}</h3>
                        </div>
                        <div className="flex gap-2">
                          <span className="bg-[#0D0D0D] border border-white/10 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-mono font-bold">
                            {brief.budget}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-white/10 pl-3">
                        {brief.details}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {brief.contentType && (
                          <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-amber-200">
                            {brief.contentType}
                          </span>
                        )}
                        {brief.format && (
                          <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-blue-200">
                            {brief.format}
                          </span>
                        )}
                        {brief.toolsNeeded?.map(tool => (
                          <span key={tool} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-gray-300">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleApplyToBrief(brief)}
                        className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7B00]/20 to-[#E63946]/20 border border-[#FF7B00]/30 text-white text-xs font-bold hover:bg-[#FF7B00]/40 transition"
                      >
                        Apply to Campaign &rarr;
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {tab === "creator-applications" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 p-8 shadow-2xl bg-[#0D0D0D]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a2e00] to-[#0e3d23] opacity-90" />
                <div className="relative z-10 max-w-2xl space-y-4">
                  <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
                    My Applications
                  </h1>
                  <p className="text-sm text-gray-300 leading-relaxed font-normal">
                    Track the status of the campaigns you've applied to. Brands will review your workflow and portfolio before reaching out to book a production sprint.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredBriefs.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
                    You haven't applied to any campaigns yet. Browse 'Open Campaigns' to get started!
                  </div>
                ) : (
                  filteredBriefs.map((brief) => {
                    const creatorEmail = session?.user?.email || "creator@synth.ai";
                    const application = brief.applications?.find(a => a.creatorEmail === creatorEmail);
                    
                    return (
                      <div key={brief.id} className="aura-vibe-card rounded-2xl p-6 space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono text-emerald-500 block">{brief.client}</span>
                            <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-md text-amber-200">
                              {brief.contentType}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white">{brief.title}</h3>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {brief.toolsNeeded?.map(tool => (
                              <span key={tool} className="text-[10px] bg-[#0D0D0D] border border-white/5 px-2 py-1 rounded-md text-gray-400">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:items-end gap-2 shrink-0">
                          <span className="bg-[#0D0D0D] border border-white/10 px-3 py-1.5 rounded-lg text-emerald-400 text-xs font-mono font-bold text-center md:text-right">
                            {brief.budget}
                          </span>
                          <div className="bg-[#FF7B00]/10 border border-[#FF7B00]/30 text-[#FFD166] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Application Submitted
                          </div>
                          <div className="text-[10px] text-gray-500 text-right">
                            Applied on: {new Date(application?.date || Date.now()).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {tab === "workspace" && (
            <div className="max-w-4xl mx-auto">
              <EngagementWorkspace
                briefs={briefs}
                creators={creators}
                onNotify={showNotification}
                onDeleteBrief={handleDeleteBrief}
                onSelectCreator={(sample, cr) => setActiveModal({ sample, creator: cr })}
              />
            </div>
          )}

          {tab === "architecture" && (
            <div className="max-w-4xl mx-auto">
              <DataModelViewer />
            </div>
          )}
        </main>

        {activeModal && (
          <PortfolioModal
            sample={activeModal.sample}
            creator={activeModal.creator}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeProfileModal && (
          <CreatorProfileModal
            creator={activeProfileModal}
            onOpenWork={(sample, cr) => {
              setActiveProfileModal(null);
              setActiveModal({ sample, creator: cr });
            }}
            onClose={() => setActiveProfileModal(null)}
          />
        )}
        
        <ChatAssistant viewMode={viewMode} />

        {renderBackButton()}
      </div>
    );
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF7B00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <LandingPage onEnterApp={handleLogin} /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/login" 
        element={!isAuthenticated ? (
          <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4 relative">
             <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-[#E63946]/10 rounded-full blur-[180px] pointer-events-none" />
             <div className="relative z-10 w-full max-w-md">
               <Login />
             </div>
          </div>
        ) : <Navigate to="/dashboard" />} 
      />
      <Route path="/logout" element={<Logout />} />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? renderDashboard() : <Navigate to="/login" />} 
      />
    </Routes>
  );
}