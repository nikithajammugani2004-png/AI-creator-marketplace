import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";

export default function ChatAssistant({ viewMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Reset history when the bubble is closed
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInput("");
      setIsTyping(false);
    } else {
      // Add initial greeting when opened
      setMessages([
        {
          role: "assistant",
          content: `Hey! 👋 I'm your ${
            viewMode === "creator" ? "Creator" : "Brand"
          } assistant for the Aura platform. Need any help figuring things out around here? Just a heads up, I only know about stuff inside the app!`,
        },
      ]);
    }
  }, [isOpen, viewMode]);

  const getAssistantResponse = (userMsg) => {
    const lower = userMsg.toLowerCase();
    let reply = "Oops, I'm just a simple assistant built for the AI Creator Marketplace! I don't really know about stuff outside the platform. 😅";
    
    if (lower.includes("brief") || lower.includes("campaign")) {
      if (viewMode === "brand") {
        reply = "Looking to post a campaign? Just head over to 'Briefs & Matchmaker'. Drop in your needs like the format and what type of content you want, and creators will find you!";
      } else {
        reply = "Wanna find some work? Check out the 'Briefs & Matchmaker' tab to browse open campaigns and apply to the ones that fit your vibe and skills!";
      }
    } else if (lower.includes("portfolio") || lower.includes("studio") || lower.includes("upload")) {
      if (viewMode === "creator") {
        reply = "You can show off your work in the 'Studio Upload' tab! Just upload your generations and make sure to include the tools and links you used. 🎨";
      } else {
        reply = "You can check out all the amazing creators in 'Discover Talent'. You'll get to see exactly how they made their art and if it's safe to use commercially!";
      }
    } else if (lower.includes("hello") || lower.includes("hi")) {
      reply = "Hey there! How's it going? Let me know if you need any help finding your way around!";
    } else if (lower.includes("clearance") || lower.includes("rights") || lower.includes("safe")) {
      reply = "Oh yeah! We have a cool Auto-Clearance thing that checks if AI content is safe for commercial use before anyone uses it. Keeps everyone out of trouble! 🛡️";
    }

    return reply;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");
    setIsTyping(true);

    // Simulate network/AI delay
    setTimeout(() => {
      setMessages([...newMsgs, { role: "assistant", content: getAssistantResponse(input) }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-tr from-[#FF7B00] to-[#E63946] rounded-full shadow-[0_0_20px_rgba(255,123,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300 animate-float"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed top-0 right-0 z-50 w-full sm:w-[400px] h-[100dvh] bg-[#0D0D0D]/95 backdrop-blur-xl flex flex-col shadow-2xl border-l border-white/10 animate-in slide-in-from-right-8 duration-300">
          <div className="bg-[#0D0D0D] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#FF7B00]" />
              <span className="font-bold text-white text-sm">Aura Platform Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#FF7B00] to-[#E63946] text-white rounded-2xl rounded-tr-sm"
                      : "bg-[#1A1A1A] text-gray-200 border border-white/10 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1.5 items-center shadow-md">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-[#0D0D0D] p-4 border-t border-white/10">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                placeholder="Ask about the platform..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#FF7B00] shadow-inner transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#FF7B00] hover:bg-[#FF7B00]/10 disabled:opacity-50 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
