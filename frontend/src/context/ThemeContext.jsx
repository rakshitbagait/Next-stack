import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    // Check if user already selected a theme
    const [theme, setTheme] = useState(() => {

        const savedTheme = localStorage.getItem("theme");

        return savedTheme ? savedTheme : "light";

    });

    // Runs whenever theme changes
    useEffect(() => {

        document.documentElement.setAttribute("data-theme", theme);

        localStorage.setItem("theme", theme);

    }, [theme]);

    // Toggle theme
    const toggleTheme = () => {

        setTheme((prevTheme) =>
            prevTheme === "light" ? "dark" : "light"
        );

    };

    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>

    );

};