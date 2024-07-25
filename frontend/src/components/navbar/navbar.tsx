import { AppShell, NavLink } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./navbar.module.css"

const pages = [
    {label: "Home", link: ""},
    {label: "Top Ratings", link: ""},
    {label: "Charts List", link: ""},
    {label: "Source Code", link: ""},
    {label: "Info", link: ""}
]

export default function Navbar() {
    const navigate = useNavigate();

    const pageLinks = pages.map((item) => (
        <NavLink 
            // className = {classes.link}
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
        <AppShell.Navbar p="md">
            {pageLinks}
        </AppShell.Navbar>
    )
}