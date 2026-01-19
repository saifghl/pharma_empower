import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'about', 'intelligence', 'tech', 'academy' or null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn", isLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (e, menuId) => {
    e.preventDefault();
    // If clicking the same menu, toggle it off. If different, open the new one.
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-left">
          <a href="/" className="navbar-logo">
            <span>Pharma</span>
            <span>Empower</span>
          </a>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={isMobileMenuOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={isMobileMenuOpen ? "nav-menu active" : "nav-menu"}>
          <div className="navbar-center">
            <ul className="nav-links">

              {/* ABOUT US DROPDOWN */}
              <li
                className={`nav-item-dropdown ${activeDropdown === "about" ? "open" : ""}`}
                onMouseEnter={() => setActiveDropdown("about")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="/about"
                  className="nav-link dropdown-trigger"
                  onClick={closeDropdown}
                >
                  About Us
                </Link>
                <div
                  className={`dropdown-menu ${activeDropdown === "about" ? "visible" : ""
                    }`}
                >
                  <div className="dropdown-content">
                    <div className="dropdown-grid">
                      <Link
                        to="/about"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Our Mission</span>
                      </Link>
                      <Link
                        to="/about"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Our Values</span>
                      </Link>
                      <Link
                        to="/about"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Our Purpose</span>
                      </Link>
                      <Link
                        to="/about"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Our Principles</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* INTELLIGENCE HUB DROPDOWN */}
              <li
                className={`nav-item-dropdown ${activeDropdown === "intelligence" ? "open" : ""
                  }`}
              >
                <a
                  href="/intelligence-hub"
                  className="nav-link dropdown-trigger"
                  onClick={(e) => toggleDropdown(e, "intelligence")}
                >
                  Intelligence Hub
                </a>
                <div
                  className={`dropdown-menu ${activeDropdown === "intelligence" ? "visible" : ""
                    }`}
                >
                  <div className="dropdown-content">
                    <div
                      className="dropdown-grid"
                      style={{
                        gridTemplateColumns: "repeat(1, 1fr)",
                        maxWidth: "400px",
                        margin: "0 auto",
                      }}
                    >
                      <Link
                        to="/intelligence-hub/news"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">News</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* EMPOWER TECH & AI DROPDOWN */}
              <li
                className={`nav-item-dropdown ${activeDropdown === "tech" ? "open" : ""
                  }`}
              >
                <Link
                  to="/empower-tech-ai"
                  className="nav-link dropdown-trigger"
                  onClick={(e) => toggleDropdown(e, "tech")}
                >
                  Empower Tech & AI
                </Link>
                <div
                  className={`dropdown-menu ${activeDropdown === "tech" ? "visible" : ""
                    }`}
                >
                  <div className="dropdown-content">
                    <div
                      className="dropdown-grid"
                      style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                    >
                      <Link
                        to="/empower/skill"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Dynamic Skill Board</span>
                      </Link>
                      <Link
                        to="/empower/emerging-tech"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Emerging Technologies</span>
                      </Link>
                      <Link
                        to="/empower/ai"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">
                          Artificial Intelligence
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* PHARMA EMPOWER ACADEMY DROPDOWN */}
              <li
                className={`nav-item-dropdown ${activeDropdown === "academy" ? "open" : ""
                  }`}
              >
                <Link
                  to="/academy"
                  className="nav-link dropdown-trigger"
                  onClick={(e) => toggleDropdown(e, "academy")}
                >
                  Pharma Empower Academy
                </Link>
                <div
                  className={`dropdown-menu ${activeDropdown === "academy" ? "visible" : ""
                    }`}
                >
                  <div className="dropdown-content">
                    <div
                      className="dropdown-grid"
                      style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
                    >
                      <Link
                        to="/academy#glance"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">
                          Glance of Pharma World
                        </span>
                      </Link>
                      <Link
                        to="/academy#career"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Core Career Stage</span>
                      </Link>
                      <Link
                        to="/academy#upskill"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">Upskill Resources</span>
                      </Link>
                      <Link
                        to="/academy#hunting"
                        className="dropdown-card"
                        onClick={closeDropdown}
                      >
                        <span className="plus-icon">+</span>
                        <span className="card-text">
                          Empower Hunting Resources
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link to="/network" className="nav-link" onClick={toggleMenu}>
                  Professional Network
                </Link>
              </li>

              {/* EVENTS LINK */}
              <li>
                <Link to="/events" className="nav-link" onClick={toggleMenu}>
                  Events
                </Link>
              </li>
              
              <li>
                <Link
                  to="/skill-board"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  Skill Board
                </Link>
                <span> </span>
              </li>
              {/* Mobile specific Contact Link */}
              <li className="mobile-only">
                <Link
                  to="/contact-us"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
              </li>
              {/* Mobile Logout/Sign-in */}
              {isLoggedIn ? (
                <li className="mobile-only">
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="nav-link logout-btn-mobile"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="mobile-only">
                  <Link to="/login" className="mobile-nav-cta" onClick={toggleMenu}>
                    Sign-in
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="navbar-right">
            <ul className="utility-links">
              <li className="desktop-only">
                <Link to="/contact-us" className="utility-link contact-btn">
                  Contact Us
                </Link>
              </li>
              {isLoggedIn ? (
                <li className="desktop-only">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              ) : (
                <li className="desktop-only">
                  <Link to="/login" className="utility-link login-btn-nav">
                    Sign-in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
