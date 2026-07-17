import React from "react";
import "../../components/common/ThemeButton.css";

import moon from "../../assets/moon.svg";
import sun from "../../assets/sun.svg";

import useTheme from "../../hooks/useTheme";

const ThemeButton = () => {

    const { theme, toggleTheme } = useTheme();

    return (

        <button
            className="theme-button"
            onClick={toggleTheme}
        >

            <img
                src={theme === "light" ? moon : sun}
                alt="theme"
            />

        </button>

    );

};

export default ThemeButton;