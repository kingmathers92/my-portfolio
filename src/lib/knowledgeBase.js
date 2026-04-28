import { tokenize } from "./tokenize";

export const KNOWLEDGE_BASE = [
  {
    id: 'stack',
    keywords: ['stack', 'tech', 'use', 'react', 'next.js', 'typescript', 'node', 'python'],
    response: `I work with React, Next.js, TypeScript, Node.js, and Python. My go-to stack for full-stack projects is Next.js App Router + Prisma + PostgreSQL, with Redis for caching and Socket.IO for real-time features. For mobile, I've used Ionic Capacitor to wrap React apps into Android builds.`,
    links: [
      {
        label: "Next.js",
        url: "https://nextjs.org"
      },
      {
        label: "TypeScript",
        url: "https://www.typescriptlang.org"
      }
    ]
  },

  {
    id: 'ejari',
    keywords: ['ejari', 'rental', 'airbnb', 'booking', 'tunisia', 'payment', 'invoice'],
    response: `Ejari is a short-term rental platform I built as a local alternative to Airbnb for Tunisia. It handles TND payments via Konnect API, real-time host-guest chat via Socket.IO, automatic fiscal invoicing, and OTP-based auth. Stack: Next.js 14, Express, Prisma, PostgreSQL, Redis.`,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/yourusername/ejari"
      }
    ]
  },

  {
    id: 'moviehub',
    keywords: ['moviehub', 'movie', 'netflix', 'tmdb', 'alan', 'voice'],
    response: `MovieHub is a Netflix-inspired UI with Alan AI voice search and live TMDB data. It's fully responsive and built with React + Material UI. You can try it at moviehubnet.netlify.app.`,
    links: [
      {
        label: "Live Demo",
        url: "https://moviehubnet.netlify.app"
      },
      {
        label: "GitHub",
        url: "https://github.com/kingmathers92/moviehub"
      }
    ]
  },

  {
    id: 'pizzasi',
    keywords: ['pizza', 'pizzasi', 'pure js', 'vanilla', 'framework'],
    response: `Pizza Si is an interactive pizza ordering site focused on smooth UX — built with pure JavaScript, zero frameworks. It was a deliberate exercise in DOM manipulation, event delegation, and CSS animations without relying on React or libraries.`,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kingmathers92/pizza-si"
      }
    ]
  },

  {
    id: 'megadl',
    keywords: ['megadl', 'mega', 'download', 'python', 'scraper'],
    response: `MegaDL is a Python tool for downloading albums from file hosting sites. It supports parallel downloads, resume, album queueing, and has both CLI and GUI modes. I built it to solve a real problem: batch-downloading creative assets without browser limitations.`,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/kingmathers92/mega-dl"
      }
    ]
  },

  {
    id: 'available',
    keywords: ['available', 'hire', 'freelance', 'remote', 'job', 'work', 'opportunity', 'role'],
    response: `I'm currently open to remote frontend and full-stack roles. I collaborate well across time zones and have experience with async workflows. If you have a project or position in mind, email me at khaled@khaledbenyahya.com or use the contact form below.`,
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/khaledbenyahya/"
      }
    ]
  },

  {
    id: 'ai',
    keywords: ['claude', 'ai', 'certificate', 'anthropic', 'artificial intelligence', 'llm'],
    response: `I'm certified in Claude AI through Anthropic's AI Fluency program (2026). I use AI tools to augment my development workflow — code review, architecture brainstorming, documentation — but I believe in understanding the fundamentals first.`,
    links: [
      {
        label: "Anthropic",
        url: "https://www.anthropic.com"
      }
    ]
  },

  {
    id: 'education',
    keywords: ['cs50', 'harvard', 'education', 'degree', 'study', 'learn'],
    response: `I completed Harvard's CS50W (Web Programming with Python and JavaScript) and CS50x (Introduction to Computer Science). CS50W covered Django, React, SQL, testing, and CI/CD. CS50x covered algorithms, data structures, memory management in C, and Python.`,
    links: [
      {
        label: "CS50",
        url: "https://cs50.harvard.edu"
      }
    ]
  },

  {
    id: 'writing',
    keywords: ['write', 'blog', 'dev.to', 'medium', 'article', 'tutorial'],
    response: `I write technical tutorials on DEV.to and Medium. My most-read piece is "Convert Your React App to Android with Ionic Capacitor" — it helped developers go cross-platform without rewriting their codebase. I also wrote about the IntersectionObserver API for lazy loading and infinite scroll.`,
    links: [
      {
        label: "DEV.to",
        url: "https://dev.to/kingmathers92"
      },
      {
        label: "Medium",
        url: "https://medium.com/@kingmathers92"
      }
    ]
  },

  {
    id: 'location',
    keywords: ['tunisia', 'where', 'location', 'based', 'live', 'from'],
    response: `I'm based in Tunisia and work remotely. I've collaborated with teams in Europe and North America, and I'm comfortable with async communication and overlapping time zones.`,
    links: []
  },

  {
    id: 'experience',
    keywords: ['experience', 'years', 'background', 'career', 'professional'],
    response: `I have 3+ years of experience building web applications, progressing from vanilla JavaScript to full-stack React/Next.js apps. I've shipped production projects with payment integration, real-time features, and AI-assisted tooling.`,
    links: [
      {
        label: "GitHub Profile",
        url: "https://github.com/yourusername"
      }
    ]
  },

  {
    id: 'portfolio',
    keywords: ['portfolio', 'site', 'this website', 'design', 'cursor', 'css'],
    response: `This portfolio is built with React + Vite, no component library — just custom CSS with a dark theme, amber accents, and a custom cursor with mix-blend-mode. The scroll reveal animations use IntersectionObserver, and the project cards have diagonal clip-path screenshot previews.`,
    links: [
      {
        label: "GitHub",
        url: "https://github.com/yourusername/portfolio"
      }
    ]
  }
];

export const FALLBACK_RESPONSE = {
  response: `That's a great question — I'd rather answer that personally. Email me at khaled@khaledbenyahya.com and let's talk.`,
  links: [
    {
      label: "Email Me",
      url: "mailto:khaled@khaledbenyahya.com"
    }
  ]
};

export function findResponse(input) {
  const tokens = tokenize(input);

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;

    for (const keyword of entry.keywords) {
      const kw = keyword.toLowerCase();

      for (const token of tokens) {
        // exact
        if (token === kw) {
          score += 3;
        }

        // partial fuzzy
        else if (
          token.includes(kw) ||
          kw.includes(token)
        ) {
          score += 1;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 0
    ? bestMatch
    : FALLBACK_RESPONSE;
}

export const SUGGESTED_PROMPTS = [
  'What stack do you use?',
  'Tell me about Ejari',
  'Are you available for work?',
  'What did you learn from CS50?',
  'How did you build this portfolio?',
  'Do you write technical articles?'
];