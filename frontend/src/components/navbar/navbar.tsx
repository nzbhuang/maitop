import {
    Drawer,
    Stack,
    UnstyledButton,
    Group,
    ThemeIcon,
    Box,
    Text,
} from "@mantine/core";
import {
    IconHomeFilled,
    IconSquareRoundedChevronsUpFilled,
    IconListSearch,
    IconBrandGithubFilled,
    IconInfoCircleFilled,
    IconExternalLink,
} from "@tabler/icons-react"
import { NavLink } from "react-router-dom";
import classes from "./navbar.module.css"
import { Settings } from "../../contexts/settingscontext";
import LoginPopup from "../loginpopup/loginpopup";

const pages = [
    { label: "Home", link: "/", icon: < IconHomeFilled />, external: false },
    { label: "Top Ratings", link: "/top-ratings", icon: < IconSquareRoundedChevronsUpFilled />, external: false },
    { label: "Charts List", link: "/charts", icon: < IconListSearch />, external: false },
    { label: "Source Code", link: "https://github.com/nzbhuang/maitop", icon: < IconBrandGithubFilled />, external: true },
    { label: "Info", link: "/info", icon: < IconInfoCircleFilled />, external: false }
]

const Navbar: React.FC = () => {
    const {
        navbarOpen,
        toggleNavbar,
        toggleLogin,
        username
    } = Settings();

    const pageButtons = pages.map((item) => (
        <UnstyledButton
            component={NavLink}
            to={item.link}
            target={item.external ? "_blank" : undefined}
            className={classes.button}
        >
            <Group gap={0} justify="space-between">
                <Group gap={0}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <ThemeIcon variant="light" className={classes.icons}>
                        {item.icon}
                    </ThemeIcon>
                </Box>
                <Box ml="md">
                    {item.label}
                </Box>
                </Group>
                {item.external && <IconExternalLink className={classes.external} />}
            </Group>
        </UnstyledButton>
    ));

    return (
        <Drawer
            title="maitop"
            classNames={{
                title: classes.header,
            }}
            size="xs"
            opened={navbarOpen}
            onClose={toggleNavbar}
            padding={0}
            withCloseButton={false}
        >
            <Stack gap={0}>
                {pageButtons}
            </Stack>
            <UnstyledButton className={classes.loginButton} onClick={toggleLogin}>
                <Text style={{fontWeight: "bold"}}>{username ? `Hello, ${username}` : "Setup User"}</Text>
            </UnstyledButton>
            <LoginPopup />
        </Drawer>
    )
}

export default Navbar;