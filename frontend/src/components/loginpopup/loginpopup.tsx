import { Button, Group, Modal, Popover, PopoverDropdown, Stack, Text, TextInput } from "@mantine/core";
import { Settings } from "../../contexts/settingscontext"
import { useState } from "react";

const LoginPopup: React.FC = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [loginState, setLoginState] = useState("login");
    const [openPopover, setOpenPopover] = useState(false)
    const {
        loginOpen,
        toggleLogin,
        username,
        setGUsername,
        clearGUsername,
    } = Settings();

    // set states of the login modal
    const toLoginState = () => setLoginState("login")
    const toConfirmState = () => setLoginState("confirm")
    const toConfigState = () => setLoginState("config")

    // handle page button submission
    const loginSubmission = () => {
        if (usernameInput) {
            toConfirmState();
        }
        else {
            setOpenPopover(true);
        }
    }

    const confirmSubmission = () => {
        setGUsername(usernameInput);
        toConfigState();
        setUsernameInput("");
    }

    const signoutSubmission = () => {
        clearGUsername();
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
                            <Button onClick={() => loginSubmission()}>
                                Set
                            </Button>
                        </Popover.Target>
                        <PopoverDropdown>Username must not be empty</PopoverDropdown>
                    </Popover>

                </Stack>
            )}

            {loginState === "confirm" && (
                <Stack>
                    <Text>Is this you?</Text>
                    <Text>Username: {usernameInput}</Text>
                    <Text>Rating: rating here</Text>
                    <Group>
                        <Button onClick={() => toLoginState()}>Cancel</Button>
                        <Button onClick={() => confirmSubmission()}>Confirm</Button>
                    </Group>
                </Stack>
            )}

            {loginState === "config" && (
                <Stack>
                    <Text>Hello, {username}</Text>
                    <Text>Your rating is: rating here</Text>
                    <Button onClick={() => signoutSubmission()}>Sign Out</Button>
                </Stack>
            )}
        </Modal>
    )
}

export default LoginPopup;