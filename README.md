# ⚡ Apex Telemetry — Enterprise B2B SaaS Admin Dashboard

> A high-performance, enterprise-grade cloud telemetry and revenue administration dashboard built with **React**, **Tailwind CSS**, **Recharts**, and **Framer Motion**, inspired by the sleek design aesthetics of **Linear.app** and **Stripe**.

---

## ✦ Key Architectural Highlights

- **Obsidian Ink & Electric Mint Design Tokens**: Bespoke CSS variable token architecture with fluid 2560px+ ultrawide root scaling.
- **Centralized Reactive State Engine (`DashboardContext`)**: Real-time client-side calculation of MRR, Active Consumers, Latency, and SLA rates backed by `localStorage` persistence.
- **High-Frequency Data Visualization Engine**:
  - Responsive Cashflow & Revenue Velocity Area Chart with custom mint gradient wave and glassmorphic floating tooltips.
  - Regional Edge Compute Bar Chart highlighting throughput across global availability zones.
- **Enterprise Management Data Grid**:
  - Live client-side multi-field search and plan tier selector filters.
  - Interactive column sorting for revenue amounts and entity identifiers.
  - Multi-breakpoint responsive morphing (stacked cards on mobile, compact columns on 1024px laptops, full tabular matrix on desktop).
  - Framer Motion slide-over inspection drawer for deep telemetry and raw JSON payload analysis.
- **Keyboard-First Command Runner (`Cmd + K` / `Ctrl + K`)**: Global spotlight palette for instantaneous navigation and action execution.
- **Real CSV Export Engine**: In-browser client-side blob generation delivering actual spreadsheet downloads.
- **Full Route Functionality**: Working views for Analytics, Customer Directory, Billing Ledger, Product Tiers, Integrations, and Workspace Settings.
- **Progressive Web App (PWA)**: Standalone installable dashboard experience with offline caching capabilities.

---

## 🛠️ Tech Stack

- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone [https://github.com/MuhammadSaim54/apex-analytics-dashboard](https://github.com/MuhammadSaim54/apex-analytics-dashboard)

# Install dependencies
npm install

# Start development server
npm run dev