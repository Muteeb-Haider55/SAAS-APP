# EduVoice

-----

## Overview

EduVoice is a high-performance SaaS platform facilitating interactive learning through AI-driven companions. Users can discover, interact with, and create custom AI tutors designed for specific educational guidance. By integrating **Vapi.ai** for real-time voice intelligence and **Clerk** for robust authentication/payments, the platform provides a seamless, vocal-first environment for 24/7 educational support.

-----

## System Architecture

EduVoice follows a modern serverless architecture optimized for low-latency voice-to-voice communication and secure data management.

### Architecture Diagram 

-----

## Key Features

| Feature | Description |
| :--- | :--- |
| **Full Auth & Billing** | Secure user onboarding and subscription management powered by **Clerk**. |
| **Companion Discovery** | Central hub to browse and interact with community-created AI companions. |
| **Custom Creation** | Advanced tools to define AI personalities, goals, and knowledge bases. |
| **Voice Interaction** | Real-time, natural conversation via **Vapi.ai** (STT/TTS). |
| **Responsive UI** | Mobile-first design using **Tailwind CSS 4** and **Radix UI**. |
| **Monitoring** | Full-stack error tracking and telemetry via **Sentry** and **OpenTelemetry**. |

-----

## Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| **Backend/Auth** | Clerk (Auth & Payments), Supabase (DB), Next.js Serverless Functions |
| **Voice AI** | Vapi.ai Web SDK |
| **Validation** | Zod, React Hook Form |
| **Utilities** | Sentry, OpenTelemetry, Lottie React, TW Animate CSS |

-----

## Folder Structure

```text
EduVoice/
├── .vscode/                # Editor specific configurations
├── components/             # Root-level shared UI components
├── dist/                   # Production build output
├── Images/                 # Project assets (e.g., logo.png)
├── src/                    # Main source code
│   ├── assets/             # Global static files (images, fonts)
│   ├── components/         # React components
│   ├── context/            # Context providers (State Management)
│   ├── lib/                # Shared utilities & SDK configs
│   ├── pages/              # View layer
│   │   └── projects/       # Project-specific sub-pages
│   ├── App.jsx             # Root application component
│   ├── main.jsx            # Entry point
│   ├── App.css             # Main component styles
│   └── index.css           # Global styles
├── .env.example            # Environment template
├── components.json         # UI component config
├── package.json            # Scripts & dependencies
└── tailwind.config.js      # Tailwind configuration
```

-----

## Getting Started

### Installation

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/your-repo/eduvoice.git
    npm install
    ```
2.  **Environment Setup:**
    Create `.env.local` with your Clerk, Supabase, and Vapi keys.
3.  **Run Dev Server:**
    ```bash
    npm run dev
    ```

