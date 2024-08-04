import { Box, Button, Divider, Fieldset, Group, Stack, Text, TextInput } from "@mantine/core"
import { Settings } from "../../contexts/settingscontext";
import { useState } from "react";
import { Chart } from "../../models/Chart";
import { getChartById } from "../../services/ChartService";

const TopRatings = () => {
    const [chartIdInput, setChartIdInput] = useState("");
    const [idInputError, setIdInputError] = useState("");
    const [forScoreChart, setForScoreChart] = useState<Chart | null>(null)

    const {
        user
    } = Settings();

    const handleIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChartIdInput = event.currentTarget.value;
        setChartIdInput(newChartIdInput);

        const chartIdInputValue = Number(newChartIdInput);
        if (!Number.isInteger(chartIdInputValue) || isNaN(chartIdInputValue) || Number(chartIdInputValue) < 1 || Number(chartIdInputValue) > 725) {
            setIdInputError("ID must be an integer of 1-725")
        } else {
            setIdInputError("")
        }
    }

    const setChart = async () => {
        try {
            const res = await getChartById(Number(chartIdInput));
            setForScoreChart(res.data)
        } catch (err) {
            console.log(err)
        }   
    }

    const clearChart = () => {
        setForScoreChart(null);
        setChartIdInput("")
    }

    return (
        <Box>
            {!user && <p>Start by setting up user in Navigation Bar</p>}
            {user && (
                <Stack>
                    <Text>Your total rating: {user.rating}</Text>
                    <Fieldset legend="Add score">
                        <Text>Chart Details</Text>
                        <Group>
                            <TextInput
                                label="Search by Chart ID"
                                type="number"
                                placeholder="ID (1-725)"
                                required
                                value={chartIdInput}
                                onChange={handleIdInput}
                                error={idInputError}
                                disabled={forScoreChart ? true : false}
                            />
                            <Divider />
                            <TextInput
                                label="Song Name"
                                value={forScoreChart ? forScoreChart.song : "<song name>"}
                                variant="filled"
                                disabled
                            />
                            <TextInput
                                label="Difficulty"
                                value={forScoreChart ? forScoreChart.difficulty : "<difficulty>"}
                                variant="filled"
                                disabled
                            />
                            <TextInput
                                label="Internal Level"
                                value={forScoreChart ? forScoreChart.internalLevel : "<internal level>"}
                                variant="filled"
                                disabled
                            />
                            <TextInput
                                label="Type"
                                value={forScoreChart ? forScoreChart.type : "<dx/std>"}
                                variant="filled"
                                disabled
                            />
                            <TextInput
                                label="Is New"
                                value={forScoreChart ? forScoreChart.new : "<1/->"}
                                variant="filled"
                                disabled
                            />
                            <Button onClick={clearChart}>
                                Clear
                            </Button>
                            <Button onClick={setChart} disabled={idInputError ? true : false}>
                                Set Chart
                            </Button>
                        </Group>
                    </Fieldset>
                </Stack>
            )}
        </Box>
    )
}

export default TopRatings;