import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Logo from "../assets/kby.png";
import { Link } from "react-scroll";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar = ({ theme, setTheme }) => {
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="nav fixed w-full h-[60px] flex justify-between items-center px-4 text-gray-300">
      <div>
        <a href="/">
          <img id="logo" src={Logo} alt="Logo" />
        </a>
      </div>

      <menu className="hidden md:flex">
        <li className="no-underline hover:underline">
          <Link to="about" spy={true} smooth={true} offset={-20} duration={500}>
            About
          </Link>
        </li>
        <li className="no-underline hover:underline">
          <Link
            to="skills"
            spy={true}
            smooth={true}
            offset={-30}
            duration={500}
          >
            Skills
          </Link>
        </li>
        <li className="no-underline hover:underline">
          <Link to="work" spy={true} smooth={true} offset={-80} duration={500}>
            Work
          </Link>
        </li>
        <li className="no-underline hover:underline">
          <Link to="blog" spy={true} smooth={true} offset={-30} duration={500}>
            Blog
          </Link>
        </li>
        <li className="no-underline hover:underline">
          <Link
            to="youtube"
            spy={true}
            smooth={true}
            offset={30}
            duration={500}
          >
            Youtube
          </Link>
        </li>
        <li className="no-underline hover:underline">
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-20}
            duration={500}
          >
            Contact
          </Link>
        </li>
        <DarkModeSwitch
          style={{ marginBottom: "0rem", color: "#fff" }}
          checked={theme === "dark"}
          onChange={toggleDarkMode}
          size={25}
        />
      </menu>

      <div
        onClick={handleClick}
        className="md:hidden z-10 hover:cursor-pointer text-2xl"
      >
        {!nav ? (
          <FaBars style={{ color: "#fff" }} />
        ) : (
          <FaTimes style={{ color: "#fff" }} />
        )}
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen mobileMenu flex flex-col justify-center items-center"
        }
      >
        <div className="darkModeMobile">
          <DarkModeSwitch
            style={{ marginBottom: "0rem" }}
            checked={theme === "dark"}
            onChange={toggleDarkMode}
            size={25}
          />
        </div>
        <div className="socialsHidden">
          <li>
            <a
              href="https://www.linkedin.com/in/khaledbenyahya/"
              target="blank"
            >
              <FaLinkedin size={30} />
            </a>
          </li>
          <li>
            <a href="https://github.com/kingmathers92" target="blank">
              <FaGithub size={30} />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@devstuff92" target="blank">
              <FaYoutube size={30} />
            </a>
          </li>
          <li>
            <a href="mailto:khaledb.yahya@gmail.com" target="blank">
              <HiOutlineMail size={30} />
            </a>
          </li>
          <li>
            <a href={require("../assets/resume.pdf")} download="Resume">
              <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </div>
        <li className="py-6 text-4xl no-underline hover:underline">
          <Link
            onClick={handleClick}
            to="about"
            spy={true}
            smooth={true}
            duration={500}
          >
            About
          </Link>
        </li>
        <li className="py-6 text-4xl no-underline hover:underline">
          <Link
            onClick={handleClick}
            to="skills"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            Skills
          </Link>
        </li>
        <li className="py-6 text-4xl no-underline hover:underline">
          <Link
            onClick={handleClick}
            to="work"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            Work
          </Link>
        </li>
        <li className="py-6 text-4xl no-underline hover:underline">
          <Link
            onClick={handleClick}
            to="blog"
            spy={true}
            smooth={true}
            duration={500}
          >
            Blog
          </Link>
        </li>
        <li className="py-6 text-4xl no-underline hover:underline">
          <Link
            onClick={handleClick}
            to="youtube"
            spy={true}
            smooth={true}
            duration={500}
            offset={-50}
          >
            Youtube
          </Link>
        </li>
        <li className="py-6 text-4xl no-underline hover:underline">
          <Link
            onClick={handleClick}
            to="contact"
            spy={true}
            smooth={true}
            duration={500}
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>
          <li className="w-[160px] h-[40px] rounded-t flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-500 bg-blue-600">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="https://www.linkedin.com/in/khaledbenyahya/"
              target="blank"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[40px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-500 bg-[#333333]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="https://github.com/kingmathers92"
              target="blank"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[40px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-500 bg-[#c4302b]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="https://www.youtube.com/@devstuff92"
              target="blank"
            >
              Youtube <FaYoutube size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[40px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-500 bg-[#00A4EF]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href="mailto:khaledb.yahya@gmail.com"
              target="blank"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className="w-[160px] h-[40px] rounded-b flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-500 bg-[#34A853]">
            <a
              className="flex justify-between items-center w-full text-gray-300"
              href={require("../assets/resume.pdf")}
              download="Resume"
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
