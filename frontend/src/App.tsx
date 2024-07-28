import { AppShell } from '@mantine/core';
import Header from './components/header/header'
import Navbar from './components/navbar/navbar';
import { useDisclosure } from '@mantine/hooks';
import './App.css'
import Router from './routes/routes'

export default function App() {
    const [navbarOpen, { toggle: navbarToggle }] = useDisclosure(false);

    return (
        <AppShell header={{ height: 60 }}>
            <Header navbarToggle={navbarToggle} navbarOpen={navbarOpen} />
            <Navbar navbarToggle={navbarToggle} navbarOpen={navbarOpen}/>
            <AppShell.Main className="pages">
                <Router />
            </AppShell.Main>
        </AppShell>
    )
}