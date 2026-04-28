import { tokenize } from "./tokenize";

export const KNOWLEDGE_BASE = [
  {
    id: 'stack',
    keywords: ['stack', 'tech', 'use', 'react', 'next.js', 'typescript', 'node', 'python', 'django'],
    response: `I work with React, Next.js, TypeScript, JavaScript, Django, Node.js, and Python. For full-stack projects my go-to is Next.js App Router on the frontend with Django REST or Node/Express on the backend, PostgreSQL for the database. For mobile, I've used Ionic Capacitor to wrap React apps into Android builds.`,
    links: [
      { label: "GitHub", url: "https://github.com/kingmathers92" },
      { label: "Portfolio", url: "https://khaledbenyahya.com" },
    ]
  },

  {
    id: 'moviehub',
    keywords: ['moviehub', 'movie', 'netflix', 'tmdb', 'alan', 'voice', 'streaming'],
    response: `MovieHub is a Netflix-inspired UI with Alan AI voice search and live TMDB movie data. Built with React and Material UI, fully responsive. One of my earlier projects that pushed me into integrating AI into interfaces.`,
    links: [
      { label: "GitHub", url: "https://github.com/kingmathers92/moviehub" },
    ]
  },

  {
    id: 'megadl',
    keywords: ['megadl', 'mega', 'download', 'platform', 'current', 'building', 'wip'],
    response: `MegaDL is my current project — a web platform I'm actively building with Next.js and Node.js. I'm genuinely excited about it. More details coming soon once it ships.`,
    links: [
      { label: "GitHub", url: "https://github.com/kingmathers92" },
    ]
  },

  {
    id: 'ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'shop', 'store', 'django', 'cart', 'orders'],
    response: `I built a full-stack e-commerce platform with a Django REST API backend and React frontend. It includes user authentication, product catalog, shopping cart, and order management. A solid full-stack project that covers the whole lifecycle.`,
    links: [
      { label: "GitHub", url: "https://github.com/kingmathers92/ecommerce-site" },
    ]
  },

  {
    id: 'pizzasi',
    keywords: ['pizza', 'pizzasi', 'pure js', 'vanilla', 'framework', 'javascript'],
    response: `Pizza Si is an interactive pizza ordering site built in pure JavaScript — zero frameworks. It was a deliberate exercise in DOM manipulation, event delegation, and CSS animations without relying on React or any libraries.`,
    links: [
      { label: "GitHub", url: "https://github.com/kingmathers92/pizza-si" },
    ]
  },

  {
    id: 'available',
    keywords: ['available', 'hire', 'freelance', 'remote', 'job', 'work', 'opportunity', 'role', 'open'],
    response: `Yes — I'm currently open to remote software developer roles (frontend and full-stack). I'm comfortable with async workflows and have worked across time zones. If you have something in mind, reach out directly.`,
    links: [
      { label: "Email", url: "mailto:khaledb.yahya@gmail.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/khaledbenyahya/" },
    ]
  },

  {
    id: 'ai',
    keywords: ['claude', 'ai', 'certificate', 'anthropic', 'artificial intelligence', 'llm', 'agents'],
    response: `I'm certified in Claude AI and Claude Code through Anthropic's programs (2026). I actively integrate AI into my work — this portfolio has a job match analyzer and chat twin built with Claude API. I use AI to augment my workflow but always understand the fundamentals first.`,
    links: [
      { label: "Anthropic", url: "https://www.anthropic.com" },
      { label: "Portfolio AI section", url: "https://khaledbenyahya.com/#ai" },
    ]
  },

  {
    id: 'security',
    keywords: ['isc2', 'security', 'cybersecurity', 'cissp', 'candidate', 'cert'],
    response: `I'm an ISC2 candidate, currently working toward my cybersecurity certification. Security awareness informs how I build — thinking about authentication, input validation, and safe API handling isn't an afterthought for me.`,
    links: [
      { label: "ISC2", url: "https://www.isc2.org" },
    ]
  },

  {
    id: 'education',
    keywords: ['cs50', 'harvard', 'education', 'degree', 'study', 'learn', 'course'],
    response: `I completed three Harvard programs: CS50x (Introduction to Computer Science — C, Python, algorithms), CS50W (Web Programming — Django, JavaScript, React, SQL), and Harvard Online's CS for Web Programming. That foundation shaped how I think about code, not just how I write it.`,
    links: [
      { label: "CS50", url: "https://cs50.harvard.edu" },
    ]
  },

  {
    id: 'writing',
    keywords: ['write', 'blog', 'dev.to', 'medium', 'article', 'tutorial', 'articles'],
    response: `I write technical tutorials on DEV.to and Medium. My most-read piece is "Convert Your React App to Android with Ionic Capacitor" — it helped developers go cross-platform without rewriting their codebase. I also wrote about the IntersectionObserver API for lazy loading and infinite scroll.`,
    links: [
      { label: "DEV.to", url: "https://dev.to/khaledbenyahya_" },
      { label: "Medium", url: "https://medium.com/@khaledb.yahya" },
    ]
  },

  {
    id: 'location',
    keywords: ['tunisia', 'where', 'location', 'based', 'live', 'from', 'nabeul'],
    response: `I'm based in Nabeul, Tunisia and work fully remote. I've collaborated with teams across different time zones and I'm comfortable with async-first workflows. C2 English proficiency.`,
    links: []
  },

  {
    id: 'experience',
    keywords: ['experience', 'years', 'background', 'career', 'professional', 'junior', 'senior'],
    response: `3+ years building web applications — progressing from vanilla JavaScript projects to full-stack React/Next.js apps with Django and Node.js backends. Self-taught through Harvard's CS50 programs and hands-on project work. Every project I've built is on GitHub.`,
    links: [
      { label: "GitHub", url: "https://github.com/kingmathers92" },
    ]
  },

  {
    id: 'portfolio',
    keywords: ['portfolio', 'site', 'this website', 'design', 'cursor', 'css', 'built', 'how'],
    response: `This portfolio is built with React and Vite — no component library, just custom CSS with a dark theme, amber gold accents, and a custom cursor using mix-blend-mode. Scroll reveals use IntersectionObserver, project cards have diagonal clip-path screenshot previews on hover, and there's a local AI assistant running in your browser right now via WebLLM.`,
    links: [
      { label: "GitHub", url: "https://github.com/kingmathers92/my-portfolio" },
    ]
  },

  {
    id: 'rate',
    keywords: ['rate', 'salary', 'price', 'cost', 'charge', 'pay', 'budget', 'how much'],
    response: `My rate depends on the scope and type of engagement — hourly, project-based, or full-time. I'm flexible and happy to discuss what works for your situation. Best to talk directly.`,
    links: [
      { label: "Email", url: "mailto:khaledb.yahya@gmail.com" },
    ]
  },
];

export const FALLBACK_RESPONSE = {
  response: `Good question — I'd rather answer that personally so I give you the right context. Email me directly and let's talk.`,
  links: [
    { label: "Email", url: "mailto:khaledb.yahya@gmail.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/khaledbenyahya/" },
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
        if (token === kw)                          score += 3;
        else if (token.includes(kw) || kw.includes(token)) score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 0 ? bestMatch : FALLBACK_RESPONSE;
}

export const SUGGESTED_PROMPTS = [
  'What stack do you use?',
  'Are you available for work?',
  'Tell me about MovieHub',
  'What did you learn from CS50?',
  'How did you build this portfolio?',
  'Do you write technical articles?',
];