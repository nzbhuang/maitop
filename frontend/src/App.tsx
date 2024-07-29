import React from 'react'
import { AppShell, MantineProvider } from '@mantine/core';
import Header from './components/header/header'
import Navbar from './components/navbar/navbar';
import './App.css'
import Router from './routes/routes'
import { SettingsProvider } from './contexts/settingscontext';
import { BrowserRouter } from 'react-router-dom';

const AppShellItems: React.FC = () => {
    return (
        <AppShell header={{ height: 60 }}>
            <Header />
            <Navbar />
            <AppShell.Main className="pages">
                <Router />
            </AppShell.Main>
        </AppShell>
    )
};

const App: React.FC = () => {
    return (
        <SettingsProvider>
            <MantineProvider defaultColorScheme='light'>
                <BrowserRouter>
                    <AppShellItems />
                </BrowserRouter>
            </MantineProvider>
        </SettingsProvider>
    )
}

export default App;