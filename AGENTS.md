# AGENTS.md — Development Guidelines & Workflow Instructions

> **Project**: Anubhav Agarwal Interactive Portfolio Website  
> **Repository**: [https://github.com/Anubhavagarwal20/Anubhav-Profile-Website](https://github.com/Anubhavagarwal20/Anubhav-Profile-Website)  
> **Production Domain**: [https://anubhav-profile-website.vercel.app](https://anubhav-profile-website.vercel.app)  
> **Target Roles**: Digital Marketing Strategist | SEO & GEO Specialist | E-commerce & Growth Marketing  

---

## 🤖 1. Mandatory Rule for AI Agents: Auto-Commit After Every Work / Prompt

Whenever an AI coding assistant (Antigravity, Cursor, Lovable, Bolt, Copilot, etc.) modifies or adds files in this repository, **you MUST commit and push the changes to GitHub immediately at the conclusion of every prompt or completed task.**

### Automated Commit & Push Protocol

After making changes and verifying the build with `npm run build`:

```powershell
# 1. Stage all changes (new files, edits, deletions)
git add -A

# 2. Commit with a clear, conventional commit message
git commit -m "<type>: <concise description of changes>"

# 3. Push immediately to the main branch
git push origin main
```

*(On macOS/Linux bash, use the same `git add -A && git commit -m "..." && git push origin main`)*

### Conventional Commit Types
- `feat:` New component, section, interaction, or feature
- `fix:` Bug fix, layout issue, TypeScript error, or broken link
- `content:` Updating text, experience, projects, or credentials in `src/data/portfolioData.ts`
- `style:` Visual design adjustments, Tailwind CSS, or typography refinements
- `perf:` Performance optimizations, asset compression, or code-splitting adjustments
- `docs:` Documentation updates in `README.md`, `AGENTS.md`, etc.

---

## 🎨 2. Visual Design System & Branding Guidelines

Agents must strictly preserve the established premium design system:

### Color Palette
- **Primary Background**: `#0C0C0C` (Deep space dark)
- **Secondary Surfaces**: `#121318`, `#14161F`, `#171922`
- **Light Contrast Canvas**: `#FFFFFF` (Exclusively used for the rounded **Services / "WHAT I DO"** section)
- **Primary Text**: `#D7E2EA` (Soft metallic silver)
- **Muted Text**: `#8E99A4`
- **Surface Borders**: `rgba(215, 226, 234, 0.12)` to `rgba(215, 226, 234, 0.25)`
- **Accent Lighting**:
  - Electric Cyan: `#00F0FF` / `#06B6D4`
  - Restrained Orange: `#FF6B00` / `#F97316`
  - Muted Royal Blue: `#3B82F6`
  - Deep Violet: `#8B5CF6`

### Typography Hierarchy
- **Display & Headings**: `Kanit` (Google Fonts, weights 300–900). Uppercase, tight letter tracking, and fluid sizing using `clamp()`.
- **Master Hero Gradient**:
  ```css
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ```
- **Body & Editorial**: `Plus Jakarta Sans` or system sans for maximum readability.
- **Data & Metadata**: Monospace (`ui-monospace`, `Consolas`, `monospace`).

---

## 🏗️ 3. Tech Stack & Architecture Rules

1. **Framework & Engine**: React 19 + TypeScript + Vite 8.
2. **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` and `@import "tailwindcss";` in `src/index.css`.
3. **Animations**: Framer Motion for scroll-driven reveals, continuous marquees, 3D cursor tilt, and sticky card scaling.
4. **Icons**: Lucide React + standalone SVG icons (e.g., `LinkedinIcon.tsx`) for brand marks.
5. **Single Source of Truth**:
   - Master data is stored in [`src/data/portfolioData.ts`](src/data/portfolioData.ts).
   - TypeScript interfaces are defined in [`src/types/portfolio.ts`](src/types/portfolio.ts).
   - Do **NOT** hardcode portfolio content inside JSX components; always bind to `portfolioData.ts` to keep updates centralized.
6. **Strict TypeScript & Build Standards**:
   - `verbatimModuleSyntax` is enabled: types must be imported using `import type { ... }`.
   - `noUnusedLocals` is enabled: remove all unused variables and unused imports before committing.
   - Always run `npm run build` before pushing to guarantee zero compile errors.

---

## 📑 4. Section Sequencing (Preserve Order)

The homepage layout must maintain this exact sequence:

1. **Hero Section**: Eyebrow label, oversized `MARKETING MEETS INTELLIGENCE.` heading, personal introduction, interactive 3D metallic sphere with cursor tilt, CTAs.
2. **Animated Expertise Marquee**: Continuous dual-direction horizontal rows (Row 1 left-to-right, Row 2 right-to-left) covering 12 core marketing domains.
3. **About Me**: Full-height dark section, 4 floating abstract corner visuals, scroll-revealed narrative, and 4 working philosophy cards.
4. **Services ("WHAT I DO")**: Crisp white background transition with generously rounded top & bottom corners, oversized numerals 01–05, and expandable strategy/deliverables drawers.
5. **Featured Projects ("SELECTED WORK")**: Dark background return, sticky stacking cards with deep-dive case study modals:
   - **GEO SEO Lab** (AI Search Visibility & GEO)
   - **Sri Ganpati Collection** (Fashion Retail Growth & Paid Social)
   - **Chloia** (Amazon Seller Central & Shopify Listing Optimization)
6. **Professional Experience ("MY JOURNEY")**: Vertical career timeline with expandable campus leadership & creative roles.
7. **Skills & Tools ("MY TOOLKIT")**: Structured domain categories and verified software ecosystem (GA4, GSC, SEMrush, Ahrefs, Shopify, Amazon Seller Central, Meta Ads, WordPress, Canva).
8. **Creative Portfolio ("CREATIVE GALLERY")**: Filterable visual grid with accessible lightbox modal.
9. **Education & Certifications ("EDUCATION & LEARNING")**: BBA in Digital Marketing (Chandigarh University), Class 12 CBSE, and verified LinkedIn Learning credentials.
10. **Contact Section ("LET'S CREATE SOMETHING MEANINGFUL.")**: Direct links, 1-click email copy, printable executive resume modal, and interactive inquiry form.
11. **Footer**: Dynamic copyright year, quick links, and smooth back-to-top interaction.

---

## ⚖️ 5. Content Integrity & Factual Rules

- **Zero Fabrication**: Never invent arbitrary metrics, fake client logos, or fabricated testimonials.
- **No Arbitrary Progress Bars**: Do not display fake proficiency percentages (e.g. "95% SEO"). Use qualitative proficiency badges ("Core Workflow", "Advanced Execution", "Practical Application").
- **Verified Education**: BBA in Digital Marketing (Chandigarh University, 2021–2024); Class 12 CBSE (2022). Do **not** add an unverified MBA.
- **Accurate Role Distinctions**: Keep internships, freelance engagements, and campus initiatives distinct and factual.

---

## 💻 6. Quick Development Reference

```powershell
# Start local development server with HMR
npm run dev

# Run TypeScript check and production build
npm run build

# Preview production build locally
npm run preview

# Mandatory post-work commit & push
git add -A
git commit -m "<type>: <description>"
git push origin main
```
