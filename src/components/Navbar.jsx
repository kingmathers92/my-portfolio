import { useState, memo } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-scroll";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Logo from "../assets/kby.png";

const NAV_LINKS = [
  { to: "about", label: "About", offset: -20 },
  { to: "skills", label: "Skills", offset: -30 },
  { to: "work", label: "Work", offset: -80 },
  { to: "blog", label: "Blog", offset: -30 },
  { to: "youtube", label: "Youtube", offset: 30 },
  { to: "contact", label: "Contact", offset: -20 },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/khaledbenyahya/",
    icon: <FaLinkedin size={30} />,
    label: "Linkedin",
    bgColor: "bg-blue-600",
  },
  {
    href: "https://github.com/kingmathers92",
    icon: <FaGithub size={30} />,
    label: "Github",
    bgColor: "bg-[#333333]",
  },
  {
    href: "https://www.youtube.com/@devstuff92",
    icon: <FaYoutube size={30} />,
    label: "Youtube",
    bgColor: "bg-[#c4302b]",
  },
  {
    href: "mailto:khaledb.yahya@gmail.com",
    icon: <HiOutlineMail size={30} />,
    label: "Email",
    bgColor: "bg-[#00A4EF]",
  },
];

const Navbar = memo(({ theme, setTheme }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const toggleDarkMode = (checked) => setTheme(checked ? "dark" : "light");

  const renderNavLink = ({ to, label, offset }) => (
    <li key={to} className="no-underline hover:underline">
      <Link
        to={to}
        spy
        smooth
        offset={offset}
        duration={500}
        onClick={isNavOpen ? toggleNav : undefined}
      >
        {label}
      </Link>
    </li>
  );

  const renderSocialLink = (
    { href, icon, label, bgColor },
    isMobile = false
  ) => (
    <li
      key={href}
      className={
        isMobile
          ? undefined
          : `w-[160px] h-[40px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-500 ${bgColor}`
      }
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={
          isMobile
            ? undefined
            : "flex justify-between items-center w-full text-gray-300"
        }
      >
        {isMobile ? icon : `${label} ${icon}`}
      </a>
    </li>
  );

  return (
    <nav className="nav fixed w-full h-[60px] flex justify-between items-center px-4 text-gray-300">
      <div>
        <a href="/">
          <img id="logo" src={Logo} alt="Logo" className="h-10" />
        </a>
      </div>

      <ul className="hidden md:flex items-center space-x-6">
        {NAV_LINKS.map(renderNavLink)}
        <li>
          <DarkModeSwitch
            checked={theme === "dark"}
            onChange={toggleDarkMode}
            size={25}
            className="text-white"
          />
        </li>
      </ul>

      <button
        onClick={toggleNav}
        className="md:hidden z-10 text-2xl hover:cursor-pointer"
        aria-label={isNavOpen ? "Close menu" : "Open menu"}
      >
        {isNavOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <FaBars className="text-white" />
        )}
      </button>

      <ul
        className={`${
          isNavOpen ? "flex" : "hidden"
        } absolute top-0 left-0 w-full h-screen mobileMenu flex flex-col justify-center items-center`}
      >
        <li className="mb-4">
          <DarkModeSwitch
            checked={theme === "dark"}
            onChange={toggleDarkMode}
            size={25}
            className="text-white"
          />
        </li>
        <ul className="flex space-x-6 mb-6">
          {SOCIAL_LINKS.map((link) => renderSocialLink(link, true))}
        </ul>
        {NAV_LINKS.map((link) => (
          <li
            key={link.to}
            className="py-6 text-4xl no-underline hover:underline"
          >
            <Link
              to={link.to}
              spy
              smooth
              offset={link.offset}
              duration={500}
              onClick={toggleNav}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>{SOCIAL_LINKS.map((link) => renderSocialLink(link))}</ul>
      </div>
    </nav>
  );
});

export default Navbar;
