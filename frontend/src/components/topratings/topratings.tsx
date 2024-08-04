import { Box, Stack, Text } from "@mantine/core"
import { Settings } from "../../contexts/settingscontext";
import AddScoreFields from "./addscorefields";
import RatingsTable from "./ratingstable";
import classes from './topratings.module.css'

const TopRatings: React.FC = () => {
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
                    <Box className={classes.tableBox}>
                        <RatingsTable />
                    </Box>
                </Stack>
            )}
        </Box>
    )
}

export default TopRatings;