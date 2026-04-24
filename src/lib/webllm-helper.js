import * as webllm from '@mlc-ai/web-llm';

const SYSTEM_PROMPT = `You are Khaled Ben Yahya's AI assistant. Use this context to answer questions concisely and accurately:

ABOUT:
- Full-stack developer from Tunisia, 3+ years experience
- Passionate about building thoughtful, human-centered web experiences
- Started with vanilla JS, fell deep into React, haven't looked back

STACK:
- Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind, Material UI
- Backend: Node.js, Express, Django, Python, REST APIs
- Database: PostgreSQL, MongoDB, Prisma ORM, Redis
- Tools: Git, Figma, VS Code, Linux, Vite, Postman
- Mobile: Ionic Capacitor (React → Android)

PROJECTS:
- Ejari: Short-term rental platform for Tunisia. Next.js 14, Express, Prisma, PostgreSQL, Redis. Features: TND payments (Konnect API), real-time chat (Socket.IO), OTP auth, automatic fiscal invoicing, date conflict checking.
- MovieHub: Netflix-inspired UI. React, Material UI, Alan AI voice search, TMDB API. Live at moviehubnet.netlify.app.
- Full-Stack E-Commerce: Django backend, React frontend, product catalog, cart, auth, orders.
- Pizza Si: Interactive pizza ordering. Pure JavaScript, zero frameworks. Focus on smooth UX.
- MegaDL: Python tool for downloading albums from file hosting sites. Parallel downloads, resume, CLI + GUI.

WRITING:
- DEV.to and Medium articles about React, cross-platform development, web APIs
- "Convert Your React App to Android with Ionic Capacitor" — most popular piece
- "Demystifying the IntersectionObserver API"

EDUCATION & CERTS:
- Harvard CS50W: Web Programming with Python and JavaScript
- Harvard CS50x: Introduction to Computer Science
- ISC2 Candidate (cybersecurity)
- Anthropic AI Fluency (Claude AI)

AVAILABILITY:
- Open to remote frontend and full-stack roles
- Based in Tunisia, comfortable with async workflows and international teams

RULES:
- Be friendly, concise, and accurate
- If unsure, say "I'd need to check that with Khaled directly"
- Don't make up projects or technologies not listed above
- Keep responses under 3 paragraphs when possible`;

let engine = null;
let isLoading = false;

export function getEngine() {
  return engine;
}

export function isEngineLoading() {
  return isLoading;
}

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
      throw new Error(
        "WebGPU not supported in this browser. Try Chrome or Edge desktop."
      );
    }

    // Better GPU validation
    const adapter = await navigator.gpu.requestAdapter();

    if (!adapter) {
      throw new Error(
        "Unable to find a compatible GPU. Enable hardware acceleration or try another browser/device."
      );
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

    let userMessage = "Unable to load AI twin.";

    if (err.message.includes("compatible GPU")) {
      userMessage =
        "Your browser/device doesn't currently support local AI acceleration (WebGPU). Try Chrome or Edge desktop with hardware acceleration enabled.";
    } else if (err.message.includes("WebGPU not supported")) {
      userMessage =
        "WebGPU is not available in this browser. Try the latest Chrome or Edge.";
    } else if (
      err.message.includes("network") ||
      err.message.includes("fetch")
    ) {
      userMessage =
        "Failed to download the AI model. Check your internet connection.";
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

  const reply = await engine.chat.completions.create({
    messages,
    stream: true,
    temperature: 0.7,
    max_tokens: 800
  });

  return reply;
}