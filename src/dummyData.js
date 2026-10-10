export const dummyCreators = [
  {
    id: "dummy-c1",
    name: "Alex Vance",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/150?u=alex",
    rate: "$85/hr",
    description: "Expert in photorealistic 3D generation using Midjourney and Runway. Former art director at top 100 agency.",
    aiProbability: 96,
    isVerified: true,
    jobsCompleted: 24,
    stack: ["Midjourney v6", "Runway Gen-3", "ComfyUI"],
    domain: "Video Generation",
    region: "Americas",
    availability: "Part-Time",
    flexibility: "Remote",
    samples: [
      { id: "s1", title: "Cyberpunk Cityscape", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070", model: "Midjourney v6", prompt: "A cyberpunk city at night with neon signs..." }
    ]
  },
  {
    id: "dummy-c2",
    name: "Maya Silva",
    email: "maya@example.com",
    avatar: "https://i.pravatar.cc/150?u=maya",
    rate: "$120/hr",
    description: "Specializes in high-fidelity audio and music generation. Created soundtracks for 15+ indie games using AI.",
    aiProbability: 91,
    isVerified: true,
    jobsCompleted: 18,
    stack: ["ElevenLabs", "Suno", "Stable Diffusion XL"],
    domain: "Audio/Music",
    region: "Europe",
    availability: "Full-Time",
    flexibility: "Hybrid",
    samples: [
      { id: "s2", title: "Ambient Background Score", url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070", model: "Suno", prompt: "An ambient lo-fi beat with soft piano..." }
    ]
  },
  {
    id: "dummy-c3",
    name: "Jin Sato",
    email: "jin@example.com",
    avatar: "https://i.pravatar.cc/150?u=jin",
    rate: "$65/hr",
    description: "UI/UX designer leveraging AI to generate massive batches of 3D icons and seamless textures.",
    aiProbability: 88,
    isVerified: false,
    jobsCompleted: 5,
    stack: ["Luma Dream Machine", "Midjourney v6"],
    domain: "Image Generation",
    region: "Asia Pacific",
    availability: "Project-Based",
    flexibility: "Remote",
    samples: [
      { id: "s3", title: "Glassmorphism UI Icons", url: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070", model: "Midjourney v6", prompt: "3d glassmorphism icons on a dark background..." }
    ]
  },
  {
    id: "dummy-c4",
    name: "Sarah Jenkins",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rate: "$150/hr",
    description: "Enterprise workflow automation expert. I build robust pipelines combining LLMs with image generation.",
    aiProbability: 99,
    isVerified: true,
    jobsCompleted: 45,
    stack: ["ComfyUI", "Flux.1 Pro", "Kling AI"],
    domain: "Workflow Automation",
    region: "Americas",
    availability: "Contract",
    flexibility: "On-Site",
    samples: [
      { id: "s4", title: "Automated Ad Variations", url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070", model: "Flux.1 Pro", prompt: "A commercial lifestyle shot of a smartwatch..." }
    ]
  },
  {
    id: "dummy-c5",
    name: "Leo Chen",
    email: "leo@example.com",
    avatar: "https://i.pravatar.cc/150?u=leo",
    rate: "$50/hr",
    description: "Up-and-coming creator focusing on short-form video content generation for TikTok and Reels.",
    aiProbability: 82,
    isVerified: false,
    jobsCompleted: 2,
    stack: ["Runway Gen-3", "Luma Dream Machine"],
    domain: "Video Generation",
    region: "Americas",
    availability: "Part-Time",
    flexibility: "Remote",
    samples: [
      { id: "s5", title: "Dynamic Product Spin", url: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=2070", model: "Luma Dream Machine", prompt: "A 360 spin of a sleek water bottle..." }
    ]
  }
];

export const dummyBriefs = [
  {
    id: "dummy-b1",
    title: "AeroPace Smartwatch Q4 Launch",
    client: "In-House Agency",
    budget: "$3,500",
    details: "We need 15 diverse lifestyle shots of a new smartwatch in various futuristic environments. Focus on photorealism and consistent brand colors (teal and orange).",
    contentType: "Social Media Ads",
    format: "1:1 Square",
    toolsNeeded: ["Midjourney v6", "ComfyUI"],
    licenseType: "Full Commercial Buyout",
    domain: "Image Generation",
    region: "Americas",
    availability: "Project-Based",
    flexibility: "Remote",
    applications: []
  },
  {
    id: "dummy-b2",
    title: "EcoBrand Packaging 3D Turnarounds",
    client: "EcoBrand Ltd",
    budget: "$1,200",
    details: "Generate 5 high-resolution 3D turnarounds of our new sustainable packaging line. Must be seamless loops.",
    contentType: "Product Visualization",
    format: "Seamless 3D Loop",
    toolsNeeded: ["Luma Dream Machine", "Kling AI"],
    licenseType: "Digital Social Only (12 Mo)",
    domain: "Video Generation",
    region: "Europe",
    availability: "Contract",
    flexibility: "Remote",
    applications: []
  },
  {
    id: "dummy-b3",
    title: "AI Voiceover for SaaS Explainer",
    client: "TechFlow Startup",
    budget: "$500",
    details: "Looking for a highly realistic, conversational voiceover for a 2-minute explainer video. Needs to sound energetic but professional.",
    contentType: "Educational Content",
    format: "16:9 Landscape",
    toolsNeeded: ["ElevenLabs"],
    licenseType: "Full Commercial Buyout",
    domain: "Audio/Music",
    region: "Global",
    availability: "Part-Time",
    flexibility: "Remote",
    applications: []
  },
  {
    id: "dummy-b4",
    title: "Concept Art for Mobile RPG",
    client: "Pixel Forge Games",
    budget: "$4,000",
    details: "Generate 20 distinct character concepts and 5 environment backgrounds for a fantasy RPG. Consistency in art style is critical.",
    contentType: "Concept Art",
    format: "4:5 Portrait",
    toolsNeeded: ["Flux.1 Pro", "Stable Diffusion XL"],
    licenseType: "Full Commercial Buyout",
    domain: "Image Generation",
    region: "Asia Pacific",
    availability: "Full-Time",
    flexibility: "Remote",
    applications: []
  },
  {
    id: "dummy-b5",
    title: "Lo-Fi Beats Channel Soundtrack",
    client: "Chill Vibes Network",
    budget: "$800",
    details: "We need 10 unique, fully generated lo-fi tracks (2-3 mins each) for a 24/7 YouTube radio stream.",
    contentType: "Music Production",
    format: "16:9 Landscape",
    toolsNeeded: ["Suno"],
    licenseType: "Full Commercial Buyout",
    domain: "Audio/Music",
    region: "Americas",
    availability: "Project-Based",
    flexibility: "Remote",
    applications: []
  }
];
