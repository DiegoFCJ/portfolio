import React from "react";
import "./ThemeSwitch.css";

interface ThemeSwitchProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ darkMode, toggleTheme }) => {
    return (
        <div className="theme-switch">
            <input
                type="checkbox"
                id="theme-toggle"
                checked={darkMode}
                onChange={toggleTheme}
            />
            <label htmlFor="theme-toggle" className="theme-switch-label">
                <span className={`icon sun ${darkMode ? "hidden" : ""}`}>
                    {/* Notare il punto prima del percorso */}
                    <img className="svg-icon" src="./sun.svg" alt="Sun Icon" />
                </span>
                <span className={`icon moon ${darkMode ? "" : "hidden"}`}>
                    <img className="svg-icon" src="./moon.svg" alt="Moon Icon" />
                </span>
            </label>
        </div>
    );
};

export default ThemeSwitch;