import React, { useState, useEffect } from "react";
import MoonIcon from "../../assets/svg/MoonIcon";
import SunIcon from "../../assets/svg/SunIcon";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") {
            return "light";
        }
        const persistedSiteTheme = localStorage.getItem("theme");
        if (persistedSiteTheme) {
            return persistedSiteTheme;
        }

        return "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-md cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

export default ThemeToggle;
