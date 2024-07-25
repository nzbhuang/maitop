import { AppShell } from '@mantine/core';
import Header from './components/header/header'
import Navbar from './components/navbar/navbar';
import { useDisclosure } from '@mantine/hooks';

export default function App() {
    const [navbarOpen, { toggle: navbarToggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: 'sm',
                collapsed: { desktop: !navbarOpen, mobile: !navbarOpen },
            }}>
            <Header navbarToggle={navbarToggle} navbarOpen={navbarOpen} />
            <Navbar />
        </AppShell>
    )
}