import { Box, Stack, Text } from "@mantine/core"
import { Settings } from "../../contexts/settingscontext";
import AddScoreFields from "./addscorefields";

const TopRatings = () => {
    const {
        user
    } = Settings();

    return (
        <Box>
            {!user && <p>Start by setting up user in Navigation Bar</p>}
            {user && (
                <Stack>
                    <Text>Your total rating: {user.rating}</Text>
                    <AddScoreFields />
                </Stack>
            )}
        </Box>
    )
}

export default TopRatings;