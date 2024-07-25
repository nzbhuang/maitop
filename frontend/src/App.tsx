import { AppShell } from '@mantine/core';
import Header from './components/header/header'

export default function App() {
    return (
        <AppShell header={{ height: 60 }}>
            <Header></Header>
        </AppShell>
    )
}