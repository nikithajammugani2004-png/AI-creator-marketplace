import React, { useState } from "react";
import { CheckCircle2, Clock, FileText, Lock, Unlock, DollarSign, ArrowRight, ShieldCheck, RefreshCw, Trash2 } from "lucide-react";

import { supabase } from "../supabaseClient";

export default function EngagementWorkspace({ briefs, creators, onNotify, onDeleteBrief }) {
  if (briefs.length === 0) {
    return (
      <div className="text-center py-12 aura-vibe-card border border-white/10 rounded-2xl">
        <ShieldCheck className="w-8 h-8 text-amber-500 mx-auto mb-3 opacity-50" />
        <p className="text-gray-400 text-sm">No active engagements. Create a brief first to start an engagement.</p>
      </div>
    );
  }

  const handleApplicationAction = async (brief, appIndex, action, email) => {
    onNotify(`Application ${action}! A notification email has been sent to ${email}.`);
    
    const updatedApps = [...brief.applications];
    updatedApps[appIndex] = { ...updatedApps[appIndex], status: action };
    
    const updatedBrief = { ...brief, applications: updatedApps };
    
    const dbBrief = { ...updatedBrief, contenttype: updatedBrief.contentType, aspectratio: updatedBrief.aspectRatio, toolsneeded: updatedBrief.toolsNeeded, licensetype: updatedBrief.licenseType };
    delete dbBrief.contentType; delete dbBrief.aspectRatio; delete dbBrief.toolsNeeded; delete dbBrief.licenseType;
    await supabase.from('briefs').upsert(dbBrief);
    
    // Update local state directly so it reflects immediately
    brief.applications = updatedApps;
  };

  return (
    <div className="space-y-6">
      {briefs.map((brief, index) => {
        const apps = brief.applications || [];
        return (
          <div key={brief.id} className="aura-vibe-card rounded-2xl p-6 space-y-6 relative group/workspace">
            <button
              onClick={() => onDeleteBrief?.(brief.id)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-lg opacity-0 group-hover/workspace:opacity-100 transition-all duration-300 z-10"
              title="Remove Engagement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 pr-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="text-xs uppercase font-mono tracking-wider text-amber-500">
                    Active Brief #{brief.id.toString().slice(-4)}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">{brief.title}</h2>
                <p className="text-xs text-gray-400">Brand: {brief.client} &bull; Budget: {brief.budget}</p>
              </div>
            </div>

            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-white text-sm mb-4">Creator Applications ({apps.length})</h3>
              
              {apps.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No creators have applied to this brief yet.</p>
              ) : (
                <div className="space-y-3">
                  {apps.map((app, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#1A1A1A] border border-white/5 rounded-lg p-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{app.creatorName}</p>
                        <p className="text-xs text-gray-400">{app.creatorEmail}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {app.status === 'pending' ? (
                          <>
                            <button 
                              onClick={() => handleApplicationAction(brief, i, 'accepted', app.creatorEmail)}
                              className="px-3 py-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-md transition"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleApplicationAction(brief, i, 'rejected', app.creatorEmail)}
                              className="px-3 py-1.5 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-md transition"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md ${app.status === 'accepted' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                            {app.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}