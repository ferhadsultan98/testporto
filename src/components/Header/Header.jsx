import React, { useState, useEffect } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import "./Header.css";
import HeaderLogo from "../../assets/Sultanovlogo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false); // Menü kapanır
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`header ${isHeaderVisible ? "visible" : "hidden"}`}>
      <div className="logo" title="Farhad Sultanov">
        <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={HeaderLogo} alt="Logo" />
        </a>
      </div>
      <div className="header-right">
        <i><Hamburger
          toggled={isMenuOpen}
          toggle={setIsMenuOpen}
          color="black"
        /></i>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <a  href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
