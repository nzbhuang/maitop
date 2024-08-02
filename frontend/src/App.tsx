import React from 'react'
import { AppShell, createTheme, MantineColorsTuple, MantineProvider, virtualColor } from '@mantine/core';
import Header from './components/header/header'
import Navbar from './components/navbar/navbar';
import './App.css'
import Router from './routes/routes'
import { SettingsProvider } from './contexts/settingscontext';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';
import { ChartsProvider } from './contexts/chartscontext';

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

const blueLight: MantineColorsTuple = [
    "#e4f6ff",
    "#cfe9ff",
    "#a2cff8",
    "#72b4f1",
    "#499deb",
    "#2e8ee8",
    "#1b87e8",
    "#0574cf",
    "#0067bb",
    "#0059a7"
];

const purpleDark: MantineColorsTuple = [
    "#f2ecff",
    "#dfd5fc",
    "#bca7f4",
    "#9776ec",
    "#784ee6",
    "#6534e2",
    "#5a27e2",
    "#4b1ac9",
    "#4116b4",
    "#37109f"
];


const theme = createTheme({
    colors: {
        blueLight,
        purpleDark,
        primary: virtualColor({
            name: "primary",
            light: "blueLight",
            dark: "purpleDark",
        }),
    },
})

const App: React.FC = () => {
    return (
        <SettingsProvider>
            <ChartsProvider>
                <MantineProvider theme={theme}>
                    <BrowserRouter>
                        <AppShellItems />
                    </BrowserRouter>
                </MantineProvider>
            </ChartsProvider>
        </SettingsProvider>
    )
}

export default App;