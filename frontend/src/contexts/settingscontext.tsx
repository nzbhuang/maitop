import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SettingsContextItems {
    lightTheme: boolean;
    toggleTheme: () => void;
    navbarOpen: boolean;
    toggleNavbar: () => void;
};

const SettingsContext = createContext<SettingsContextItems | undefined>(
    undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lightTheme, setTheme] = useState(true);
    const [navbarOpen, setNavbar] = useState(false);

    const toggleTheme = () => {
        setTheme(!lightTheme);
    };

    const toggleNavbar = () => {
        setNavbar(!navbarOpen);
    };

    return (
        <SettingsContext.Provider
            value={{
                lightTheme,
                toggleTheme,
                navbarOpen,
                toggleNavbar,
            }}>
                {children}
        </SettingsContext.Provider>
    );
};

export const Settings = () => {{
    const context = useContext(SettingsContext)
    if (context === undefined) {
        throw new Error('Settings must be used within a SettingsProvider');
      }
    return context;
}};

