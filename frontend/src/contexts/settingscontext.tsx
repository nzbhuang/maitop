import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SettingsContextItems {
    lightTheme: boolean;
    toggleTheme: () => void;
    navbarOpen: boolean;
    toggleNavbar: () => void;
    loginOpen: boolean;
    toggleLogin: () => void;
    username: string;
    setGUsername: (userInput: string) => void;
    clearGUsername: () => void;
};

const SettingsContext = createContext<SettingsContextItems | undefined>(
    undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lightTheme, setTheme] = useState(true);
    const [navbarOpen, setNavbar] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [username, setUsername] = useState("");

    const toggleTheme = () => {
        setTheme(lightTheme ? false : true);
    };

    const toggleNavbar = () => {
        setNavbar(!navbarOpen);
    };

    const toggleLogin = () => {
        setLoginOpen(!loginOpen);
    }

    const setGUsername = (userInput: string) => {
        setUsername(userInput);
    }

    const clearGUsername = () => {
        setUsername("");
    }

    return (
        <SettingsContext.Provider
            value={{
                lightTheme,
                toggleTheme,
                navbarOpen,
                toggleNavbar,
                loginOpen,
                toggleLogin,
                username,
                setGUsername,
                clearGUsername,
            }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const Settings = () => {
    {
        const context = useContext(SettingsContext)
        if (context === undefined) {
            throw new Error('Settings must be used within a SettingsProvider');
        }
        return context;
    }
};

