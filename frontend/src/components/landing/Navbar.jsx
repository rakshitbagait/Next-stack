import React, { useState } from "react";
import "../../styles/landing.css";

import { Link } from "react-router-dom";

import Logo from "../../components/common/Logo";
import moon from "../../assets/moon.svg";
import ThemeButton from "../common/ThemeButton";

import Features from "../landing/Features"
import {
    FaBars,
    FaTimes,
    FaHome,
    FaRocket,
    FaInfoCircle,
    FaUsers,
    FaNewspaper,
    FaChartLine,
} from "react-icons/fa";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>

            {/* ================= Navbar ================= */}

            <nav className="navbar">

                <div className="navbar-left">
                    <Logo />
                </div>

                <div className="navbar-center">
                    <a href="#features">Features</a>
                    <a href="#faq">FAQ</a>
                    <a href="#community">Community</a>
                    <a href="#trending  ">Trending Tech</a>
                    <a href="#news">News</a>
                </div>

                <div className="navbar-right">


<ThemeButton
    theme="light"
    onToggle={() => console.log("Clicked")}
/>

                    <Link to="/register">
                        <button className="register-btn">
                            Get Started
                        </button>
                    </Link>

                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>

                </div>

                {/* Hamburger */}

                <div className="hamburger">

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </div>

            </nav>

            {/* ================= Overlay ================= */}

            {menuOpen && (
                <div
                    className="overlay"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            {/* ================= Mobile Drawer ================= */}

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

  

                <a
                    href="#home"
                    onClick={() => setMenuOpen(false)}
                >
                    <FaHome />
                    <span>Home</span>
                </a>

                <a
                    href="#features"
                    onClick={() => setMenuOpen(false)}
                >
                    <FaRocket />
                    <span>Features</span>
                </a>

                <a
                    href="#about"
                    onClick={() => setMenuOpen(false)}
                >
                    <FaInfoCircle />
                    <span>About</span>
                </a>

                <a
                    href="#community"
                    onClick={() => setMenuOpen(false)}
                >
                    
                    <FaUsers />
                    <span>Community</span>
                </a>
                
                <a
                    href="#tech"
                    onClick={() => setMenuOpen(false)}
                >
                    <FaChartLine />
                    <span>Trending Tech</span>
                </a>

                <a
                    href="#news"
                    onClick={() => setMenuOpen(false)}
                >
                    <FaNewspaper />
                    <span>News</span>
                </a>

                <hr />

                <div className="theme-mobile">
                    <ThemeButton />
                </div>

                <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                >
                    <button className="register-mobile">
                        Get Started
                    </button>
                </Link>

                <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                >
                    <button className="login-mobile">
                        Login
                    </button>
                </Link>

            </div>

        </>
    );
};

export default Navbar;