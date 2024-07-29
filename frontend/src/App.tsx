import React from 'react'
import { AppShell } from '@mantine/core';
import Header from './components/header/header'
import Navbar from './components/navbar/navbar';
import './App.css'
import Router from './routes/routes'

const App: React.FC = () => {
    return (
        <AppShell header={{ height: 60 }}>
            <Header />
            <Navbar />
            <AppShell.Main className="pages">
                <Router />
            </AppShell.Main>
        </AppShell>
    )
}

export default App;