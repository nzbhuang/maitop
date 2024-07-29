import {
    AppShell,
    Burger,
    Group,
    Divider,
    useMantineColorScheme,
    useComputedColorScheme
} from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import classes from './header.module.css'
import { Settings } from '../../contexts/settingscontext'

const Header: React.FC = () => {
    const {
        navbarOpen,
        toggleNavbar,
    } = Settings();

    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light");

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === "light" ? "dark" : "light");
    };

    return (
        <AppShell.Header bg="primary" className={classes.header}>
            <Group style={{ paddingLeft: "16px" }}>
                <Burger color="white" size="sm" lineSize={2} opened={navbarOpen} onClick={toggleNavbar} />
                <h3>maitop</h3>
            </Group>
            <Group style={{ paddingRight: "16px" }}>
                <Divider orientation="vertical" className={classes.divider} />
                <div onClick={toggleColorScheme} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    {computedColorScheme === "light" ? <IconSunFilled size={24} /> : <IconMoonFilled size={24} />}
                </div>
            </Group>
        </AppShell.Header>
    )
}

export default Header;