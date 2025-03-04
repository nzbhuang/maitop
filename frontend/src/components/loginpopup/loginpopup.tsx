import { Button, Group, Modal, Popover, PopoverDropdown, Stack, Text, TextInput } from "@mantine/core";
import { Settings } from "../../contexts/settingscontext"
import { useEffect, useState } from "react";
import { getUserFromUsername } from "../../services/UserService";
import axios from "axios";
import { User } from "../../models/User";
import classes from './loginpopup.module.css'

const LoginPopup: React.FC = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [loginState, setLoginState] = useState("login");
    const [openPopover, setOpenPopover] = useState(false)
    const [userToConfirm, setUserToConfirm] = useState<User | null>(null)

    const {
        loginOpen,
        toggleLogin,
        createNewUser,
        loginUser,
        signOutUser,
        user,
    } = Settings();

    // set login state to be config if a user exists
    useEffect(() => {
        if (user) {
            setLoginState("config");
        } else {
            setLoginState("login");
        }
    }, []);

    // set states of the login modal
    const toLoginState = () => setLoginState("login")
    const toConfirmState = () => setLoginState("confirm")
    const toCreateState = () => setLoginState("create")
    const toConfigState = () => setLoginState("config")

    // handle page button submission
    const loginSubmission = async () => {
        if (usernameInput) {
            try {
                const res = await getUserFromUsername(usernameInput);
                setUserToConfirm(res.data)
                toConfirmState();
            } catch (err) {
                // if user not found, send to user creation
                if (axios.isAxiosError(err)) {
                    if (err.response && err.response.status === 404) {
                        toCreateState()
                    } else {
                        console.error("not 404: ", err)
                    }
                } else {
                    console.error("unexpected axios error:", err)
                }
            }
        } else {
            setOpenPopover(true)
        }
    }

    const confirmSubmission = () => {
        if (userToConfirm) {
            loginUser(userToConfirm);
            toConfigState();
            setUsernameInput("");
            setUserToConfirm(null);
        } else {
            console.error("confirm logic failed?")
        }
    }

    const createSubmission = () => {
        try {
            createNewUser(usernameInput);
            toConfigState();
            setUsernameInput("");
        } catch (err) {
            console.log("bruh")
        }
    }

    const signoutSubmission = () => {
        signOutUser();
        toLoginState();
    }

    return (
        <Modal
            opened={loginOpen}
            onClose={toggleLogin}
            title={loginState === "config" ? "Configure User" : "Set up maitop User"}
            size="sm"
        >
            {loginState === "login" && (
                <Stack>
                    <TextInput
                        label="Username:"
                        placeholder="Enter Username"
                        required
                        value={usernameInput}
                        onChange={(event) => setUsernameInput(event.currentTarget.value)}
                    />
                    <Popover opened={openPopover} onChange={setOpenPopover}>
                        <Popover.Target>
                            <Button onClick={() => loginSubmission()} className={classes.button}>
                                Set
                            </Button>
                        </Popover.Target>
                        <PopoverDropdown>Username must not be empty</PopoverDropdown>
                    </Popover>
                </Stack>
            )}

            {loginState === "create" && (
                <Stack>
                    <Text>User not found, Create new user?</Text>
                    <Text>Username: {usernameInput}</Text>
                    <Group>
                        <Button onClick={() => toLoginState()} className={classes.button}>Cancel</Button>
                        <Button onClick={() => createSubmission()} className={classes.button}>Confirm</Button>
                    </Group>
                </Stack>
            )}

            {loginState === "confirm" && (
                <Stack>
                    <Text>Is this you?</Text>
                    <Text>Username: {userToConfirm?.username}</Text>
                    <Text>Rating: {userToConfirm?.rating}</Text>
                    <Group>
                        <Button onClick={() => toLoginState()} className={classes.button}>Cancel</Button>
                        <Button onClick={() => confirmSubmission()} className={classes.button}>Confirm</Button>
                    </Group>
                </Stack>
            )}

            {loginState === "config" && (
                <Stack>
                    <Text>Hello, {user?.username}</Text>
                    <Text>Your rating is: {user?.rating}</Text>
                    <Group>
                        <Button onClick={() => signoutSubmission()} className={classes.button}>Sign Out</Button>
                    </Group>

                </Stack>
            )}
        </Modal>
    )
}

export default LoginPopup;