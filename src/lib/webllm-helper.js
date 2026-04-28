import * as webllm from '@mlc-ai/web-llm';

const SYSTEM_PROMPT = `You are Khaled Ben Yahya's AI assistant. Use this context to answer questions concisely and accurately.

ABOUT:
- Software Developer from Nabeul, Tunisia — 3+ years experience
- Builds full-stack web applications (React/Next.js frontend + Django/Node.js backend)
- Self-taught through Harvard CS50 programs and hands-on project work
- Remote-ready, C2 English proficiency

STACK:
- Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind, Material UI, Redux
- Backend: Node.js, Express, Django, Python, REST APIs
- Database: PostgreSQL, MongoDB
- Tools: Git, Figma, VS Code, Linux, Vite, Postman
- Mobile: Ionic Capacitor (React to Android)

PROJECTS:
- MovieHub: Netflix-inspired UI. React, Material UI, Alan AI voice search, TMDB API. GitHub: github.com/kingmathers92/moviehub
- MegaDL: Current web platform in active development. Next.js, Node.js.
- Full-Stack E-Commerce: Django REST API backend + React frontend. Auth, catalog, cart, orders. GitHub: github.com/kingmathers92/ecommerce-site
- Pizza Si: Interactive pizza ordering. Pure JavaScript, zero frameworks. GitHub: github.com/kingmathers92/pizza-si
- This portfolio: React + Vite, custom CSS, WebLLM local AI, Claude API integration, IntersectionObserver scroll reveals, clip-path project card animations.

WRITING:
- DEV.to (@khaledbenyahya_) and Medium (@khaledb.yahya)
- "Convert Your React App to Android with Ionic Capacitor" — most popular piece (1,000+ readers)
- "Demystifying the IntersectionObserver API"

EDUCATION & CERTIFICATIONS:
- Harvard CS50W: Web Programming with Python and JavaScript (Mar 2022)
- Harvard Online: Computer Science for Web Programming (2021–2022)
- Harvard CS50x: Introduction to Computer Science (Jan 2022)
- Claude Code 101 — Anthropic (Apr 2026)
- Claude 101 — Anthropic (Apr 2026)
- ISC2 Candidate — actively working toward cybersecurity certification
- EF SET English Certificate C2 Proficient (2022)
- Bootstrap 4 — HKUST / Coursera (2021)

CONTACT:
- Email: khaledb.yahya@gmail.com
- Portfolio: khaledbenyahya.com
- GitHub: github.com/kingmathers92
- LinkedIn: linkedin.com/in/khaledbenyahya

AVAILABILITY:
- Open to remote software developer roles (frontend and full-stack)
- Comfortable with async workflows and international teams

RULES:
- Be friendly, concise, and accurate
- If unsure about something specific, say "I'd need to check that with Khaled directly"
- Don't make up projects or technologies not listed above
- Keep responses under 3 short paragraphs
- Always refer to contact as khaledb.yahya@gmail.com`;

let engine = null;
let isLoading = false;

export function getEngine()      { return engine; }
export function isEngineLoading() { return isLoading; }

export async function supportsWebLLM() {
  if (!navigator.gpu) return false;
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) return false;
    await adapter.requestDevice();
    return true;
  } catch {
    return false;
  }
}

export async function initEngine(onProgress) {
  if (engine) return engine;
  if (isLoading) return null;

  isLoading = true;

  try {
    if (!navigator.gpu) {
      throw new Error("WebGPU not supported in this browser. Try Chrome or Edge desktop.");
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error("Unable to find a compatible GPU. Enable hardware acceleration or try another browser/device.");
    }
    await adapter.requestDevice();

    const chat = new webllm.MLCEngine();
    chat.setInitProgressCallback((report) => {
      onProgress?.(Math.round(report.progress * 100));
    });

    await chat.reload("Qwen2-0.5B-Instruct-q4f16_1-MLC");

    engine = chat;
    return engine;

  } catch (err) {
    console.error("WebLLM init failed:", err);

    let userMessage = "Unable to load AI model.";
    if (err.message.includes("compatible GPU")) {
      userMessage = "Your browser/device doesn't support local AI acceleration (WebGPU). Try Chrome or Edge desktop with hardware acceleration enabled.";
    } else if (err.message.includes("WebGPU not supported")) {
      userMessage = "WebGPU is not available in this browser. Try the latest Chrome or Edge.";
    } else if (err.message.includes("network") || err.message.includes("fetch")) {
      userMessage = "Failed to download the AI model. Check your internet connection.";
    }
    throw new Error(userMessage);

  } finally {
    isLoading = false;
  }
}

export async function chatWithAI(userMessage, history = []) {
  if (!engine) throw new Error('Engine not initialized');

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userMessage }
  ];

  return await engine.chat.completions.create({
    messages,
    stream: true,
    temperature: 0.7,
    max_tokens: 800,
  });
}