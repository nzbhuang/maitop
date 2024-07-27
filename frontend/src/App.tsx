import { AppShell } from '@mantine/core';
import Header from './components/header/header'
import Navbar from './components/navbar/navbar';
import { useDisclosure } from '@mantine/hooks';
import './App.css'

export default function App() {
    const [navbarOpen, { toggle: navbarToggle }] = useDisclosure(false);

    return (
        <AppShell header={{ height: 60 }}>
            <Header navbarToggle={navbarToggle} navbarOpen={navbarOpen} />
            <Navbar navbarToggle={navbarToggle} navbarOpen={navbarOpen}/>
            <AppShell.Main className="pages">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non lacus porttitor, gravida purus nec, scelerisque magna. Praesent commodo lacinia lacus, ac facilisis nisl euismod vel. Integer lobortis mauris eu erat mollis tempus. Vestibulum dapibus lacus ac dictum dictum. Duis sollicitudin gravida porttitor. Aliquam erat volutpat. In at libero eget turpis elementum malesuada. Fusce ut turpis lectus. Phasellus at tortor vel ex sollicitudin laoreet a ac ipsum.</p>
            </AppShell.Main>
        </AppShell>
    )
}