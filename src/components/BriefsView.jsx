import React from "react";
import BriefBuilder from "./BriefBuilder";
import { ChevronRight, Sparkles, CheckCircle2, Trash2 } from "lucide-react";

export default function BriefsView({ onPublishBrief }) {
    return (
        <div className="space-y-6">
            <BriefBuilder onSave={onPublishBrief} />
        </div>
    );
}