import { Drawer, NavLink } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./navbar.module.css"

const pages = [
    { label: "Home", link: "" },
    { label: "Top Ratings", link: "" },
    { label: "Charts List", link: "" },
    { label: "Source Code", link: "" },
    { label: "Info", link: "" }
]

export default function Navbar({ navbarOpen, navbarToggle }: any) {
    const navigate = useNavigate();

    const pageLinks = pages.map((item) => (
        <NavLink
            // classNames = {classes.link}
            styles={() => ({
                label: {
                    fontSize: '16px',
                }
            })}
            label={item.label}
            onClick={() => navigate(item.link)}
        />
    ));

    return (
        <Drawer
            title="maitop"
            classNames={{
                title: classes.header,
            }}
            size="sm"
            opened={navbarOpen}
            onClose={navbarToggle}
        >
            {pageLinks}
        </Drawer>
    )
}