# Aura AI Creator Marketplace

Aura is a two-sided marketplace designed to connect brands and agencies with top-tier AI content creators. It standardizes the fragmented AI production process by providing verified workflows (Visual Node Dependency Trees), commercial clearance validation, and AI-driven matchmaking. This ensures that brands can commission AI-generated content safely and efficiently.

## 🚀 Features

### For Brands & Agencies
- **Discover Talent**: Browse a rich directory of AI creators with verified portfolios and match scores.
- **Workflow Inspection**: View the exact Visual Node Dependency Tree (e.g., Base Prompt -> Flux.1 Pro -> Style LoRA -> Runway Gen-3) used to create an asset.
- **Commercial Clearance Validation**: Certifies that workflows use commercially safe models.
- **Briefs & Matchmaker**: Post new campaigns specifying budget, tools needed, and license type.
- **Engagement Workspace**: Centralized dashboard for managing active campaigns and reviewing creator applications.

### For AI Creators
- **Discover Campaigns**: Browse open campaigns posted by brands and apply with a single click.
- **Studio Upload**: Upload new portfolio pieces with metadata, pipeline definitions, and clearance verification.
- **Monetize Skills**: Get discovered by top brands for your prompts, workflows, and generation skills.

### Platform
- **Aura AI Chat Assistant**: Contextual chatbot tailored to your current mode (Brand or Creator).
- **Dual-Sided UI**: Seamlessly toggle between Brand and Creator views.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Lucide React icons
- **Backend / Database**: Supabase (PostgreSQL, Real-time CRUD)
- **Styling**: Custom "Aura Vibe" design system with neon gradients, glassmorphism, and dark mode

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database setup)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd ai-creator-marketplace
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🗺️ Roadmap (Upcoming Features)
- **Automated Email Notifications**: Supabase Edge Functions with Resend/SendGrid.
- **In-App Messaging**: Direct chat between brands and creators.
- **Payment Escrow**: Stripe Connect integration for safe production sprints.
- **Generative AI Integration**: Live Gemini API for dynamic AI Assistant responses and email drafting.

## 📄 License
This project is built as a Hackathon MVP. 
