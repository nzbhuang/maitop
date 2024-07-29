import { 
    AppShell,
    Burger,
    Group,
    Divider } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import classes from './header.module.css'
import { Settings } from '../../contexts/settingscontext'

const Header: React.FC = () => {
    const {
        lightTheme,
        toggleTheme,
        navbarOpen,
        toggleNavbar,
    } = Settings();

    return (
        <AppShell.Header className={classes.header}>
            <Group style={{ paddingLeft: "16px" }}>
                <Burger color="white" size="sm" lineSize={2} opened={navbarOpen} onClick={toggleNavbar} />
                <h3>maitop</h3>
            </Group>
            <Group style={{ paddingRight: "16px"}}>
                <Divider orientation="vertical" color="#4dabf7" />
                <div onClick={toggleTheme} style={{ display: "flex", alignItems: "center", cursor: "pointer"}}>
                    {lightTheme ? <IconSunFilled size={24} /> : <IconMoonFilled size={24}/>}
                </div>
            </Group>
        </AppShell.Header>
    )
}

export default Header;