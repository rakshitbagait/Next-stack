import React, { useState } from "react";
import "../../styles/topnavbar.css";

import { Link } from "react-router-dom";

import Logo from "../../components/common/Logo";
import moon from "../../assets/moon.svg";
import ThemeButton from "../common/ThemeButton";
import SearchBar from "./SearchBar";

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

const TopNavbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>

            {/* ================= Navbar ================= */}

            <nav className="top-navbar">

                <div className="top-navbar-left">
                    <Logo />
                </div>
                    <div className="top-navbar-center">
        <SearchBar />
    </div>
                <div className="top-navbar-right">


<ThemeButton
    theme="light"
    onToggle={() => console.log("Clicked")}
/>
              </div>

            </nav>

        </>
    );
};

export default TopNavbar;