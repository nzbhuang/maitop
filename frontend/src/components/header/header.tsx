import { 
    AppShell,
    Burger,
    Group,
    Divider } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import { useState } from 'react'
import classes from './header.module.css'

const Header = ({navbarOpen, navbarToggle}: any) => {
    const [lightMode, toggleTheme] = useState(true);

    const toggleThemeIcon = () => {
        toggleTheme(!lightMode)
    }

    return (
        <AppShell.Header className={classes.header}>
            <Group style={{ paddingLeft: "16px" }}>
                <Burger color="white" size="sm" lineSize={2} opened={navbarOpen} onClick={navbarToggle} />
                <h3>maitop</h3>
            </Group>
            <Group style={{ paddingRight: "16px"}}>
                <Divider orientation="vertical" color="#4dabf7" />
                <div onClick={toggleThemeIcon} style={{ display: "flex", alignItems: "center", cursor: "pointer"}}>
                    {lightMode ? <IconSunFilled size={24} /> : <IconMoonFilled size={24}/>}
                </div>
            </Group>
        </AppShell.Header>
    )
}

export default Header;