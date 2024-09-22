import tenzies from "../assets/tenzies.png";
import crypto from "../assets/cryptod.png";
import moviehub from "../assets/moviehub.png";
import pizzasi from "../assets/pizzasi.png";

export const projectsData = [
  {
    id: 1,
    name: "Tenzies Game",
    description:
      "A dice game where you match 10 dice by holding and rolling until all match.",
    logos: [
      {
        src: "https://www.cdnlogo.com/logos/r/63/react.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/c/18/css.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/a/92/android.svg",
      },
    ],
    image: tenzies,
    github: "https://github.com/kingmathers92/React-Tenzies-Game",
    live: "https://kingmathers92.github.io/React-Tenzies-Game/",
    date: "2022-06-03",
  },
  {
    id: 2,
    name: "Crypto Monitor",
    description:
      "Track cryptocurrency stats and prices using CoinGecko API with Firebase for authentication.",
    logos: [
      {
        src: "https://www.cdnlogo.com/logos/r/63/react.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/c/18/css.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/t/58/tailwind-css.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/f/67/firebase.svg",
      },
    ],
    image: crypto,
    github: "https://github.com/kingmathers92/CryptoMonitor",
    live: "https://cryptomonitor-824dc.web.app/",
    date: "2023-01-19",
  },
  {
    id: 3,
    name: "Moviehub",
    description:
      "Moviehub uses React, Redux, and Alan AI to provide advanced movie search capabilities.",
    logos: [
      {
        src: "https://www.cdnlogo.com/logos/r/63/react.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/r/69/redux.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/m/57/material-ui.svg",
      },
    ],
    image: moviehub,
    github: "https://github.com/kingmathers92/moviehub",
    live: "https://moviehubnet.netlify.app/",
    date: "2023-03-14",
  },
  {
    id: 4,
    name: "PizzaSi",
    description:
      "A pizza ordering web app designed to assist a local Italian restaurant's business.",
    logos: [
      {
        src: "https://www.cdnlogo.com/logos/r/63/react.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/t/58/tailwind-css.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/r/69/redux.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/f/67/firebase.svg",
      },
      {
        src: "https://www.cdnlogo.com/logos/s/44/stripe.svg",
      },
    ],
    image: pizzasi,
    github: "https://github.com/kingmathers92/pizza-si",
    live: "https://pizzasi.vercel.app/",
    date: "2023-09-21",
  },
];
