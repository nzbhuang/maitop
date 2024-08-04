import React, { createContext, useState, useContext, ReactNode } from 'react';
import { createUser } from '../services/UserService';
import { User } from '../models/User';

interface SettingsContextItems {
    lightTheme: boolean;
    toggleTheme: () => void;
    navbarOpen: boolean;
    toggleNavbar: () => void;
    loginOpen: boolean;
    toggleLogin: () => void;
    createNewUser: (userInput: string) => void;
    loginUser: (user: User) => void
    signOutUser: () => void;
    user: User | null;
};

const SettingsContext = createContext<SettingsContextItems | undefined>(
    undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lightTheme, setTheme] = useState(true);
    const [navbarOpen, setNavbar] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const toggleTheme = () => {
        setTheme(lightTheme ? false : true);
    };

    const toggleNavbar = () => {
        setNavbar(!navbarOpen);
    };

    const toggleLogin = () => {
        setLoginOpen(!loginOpen);
    }

    const createNewUser = async (userInput: string) => {
        try {
            const newUser = await createUser(userInput)
            setUser(newUser.data)
            console.log("user created: ", newUser)
        } catch (err) {
            console.error("failed creating user: ", err)
        }
    }

    const loginUser = (user: User) => {
        setUser(user);
    }


    const signOutUser = () => {
        setUser(null);
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
                createNewUser,
                loginUser,
                signOutUser,
                user,
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

