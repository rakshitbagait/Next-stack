import React from "react";
import { NavLink } from "react-router-dom";

import {
    FaHouse,
    FaRoute,
    FaCompass,
    FaRobot,
    FaComments,
    FaNewspaper,
    FaFire,
    FaGear,
    FaArrowRightFromBracket,
} from "react-icons/fa6";

import "../../styles/navmenu.css";

const NavMenu = () => {
    return (
        <aside className="sidebar">

            {/* Navigation */}

            <div className="sidebar-menu">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaHouse />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/roadmap"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaRoute />
                    <span>My Roadmap</span>
                </NavLink>

                <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaCompass />
                    <span>Explore Roadmaps</span>
                </NavLink>

                <NavLink
                    to="/mentor"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaRobot />
                    <span>AI Mentor</span>
                </NavLink>

                <NavLink
                    to="/community"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaComments />
                    <span>Discussions</span>
                </NavLink>

                <NavLink
                    to="/news"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaNewspaper />
                    <span>News</span>
                </NavLink>

                <NavLink
                    to="/trending"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaFire />
                    <span>Trending Technologies</span>
                </NavLink>

            </div>

            {/* Bottom */}

            <div className="sidebar-bottom">

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        isActive ? "sidebar-item active" : "sidebar-item"
                    }
                >
                    <FaGear />
                    <span>Settings</span>
                </NavLink>

                <button className="sidebar-item logout-btn">
                    <FaArrowRightFromBracket />
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    );
};

export default NavMenu;