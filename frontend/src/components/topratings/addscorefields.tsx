import { Fieldset, Group, TextInput, Divider, Button, Text } from "@mantine/core"
import { Score } from "../../models/Score";
import { addScoreToUser, getUserFromId, updateRatingById } from "../../services/UserService";
import { useState } from "react";
import { Settings } from "../../contexts/settingscontext";
import { Chart } from "../../models/Chart";
import { getChartById } from "../../services/ChartService";
import { createScore } from "../../services/ScoreService";
import { calculateScoreRating } from "../../utils/rating";
import classes from './topratings.module.css'


const AddScoreFields: React.FC = () => {
    const [chartIdInput, setChartIdInput] = useState("");
    const [idInputError, setIdInputError] = useState("");
    const [forScoreChart, setForScoreChart] = useState<Chart | null>(null)
    const [scoreAccInput, setScoreAccInput] = useState("")
    const [accInputError, setAccInputError] = useState("")
    const [scoreRating, setScoreRating] = useState<number>(0)

    const {
        user,
        loginUser
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

    const handleAccInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAccInput = event.currentTarget.value;
        setScoreAccInput(newAccInput);

        const chartIdInputValue = Number(newAccInput);
        if (isNaN(chartIdInputValue) || Number(chartIdInputValue) < 0 || Number(chartIdInputValue) > 101) {
            setAccInputError("Accuracy must be of 0-101 (%)")
        } else {
            setAccInputError("")
            if (forScoreChart) {
                setScoreRating(calculateScoreRating(Number(forScoreChart.internalLevel), chartIdInputValue))
            }
        }
    }

    const createNewScoreFromInfo = async () => {
        if (forScoreChart && scoreAccInput && scoreRating) {
            try {
                const res = await createScore(forScoreChart.chartId, Number(scoreAccInput), scoreRating);
                return res.data;
            } catch (err) {
                console.log(err);
            }
        }
    }

    const addNewScoreToUser = async (newScore: Score) => {
        console.log(user)
        console.log("new", newScore)
        if (newScore && user) {
            console.log("hi")
            try {
                await addScoreToUser(user.userId, newScore.scoreId);
                if (user) {
                    await updateRatingById(user.userId);
                    const updatedUser = await getUserFromId(user.userId);
                    loginUser(updatedUser)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    const createScoreAndAddToUser = async () => {
        if (user && forScoreChart && scoreAccInput && scoreRating) {
            const newScore = await createNewScoreFromInfo();
            await addNewScoreToUser(newScore);
            setScoreAccInput("")
            clearChart();
            setScoreRating(0)
        }
    }

    return (
        <Fieldset legend="Add score">
            <Text className={classes.header}>Chart Details:</Text>
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
            </Group>
            <Group>
                <Button onClick={setChart} disabled={idInputError ? true : false} className={classes.button}>
                    Set Chart
                </Button>
                <Button onClick={clearChart} className={classes.button}>
                    Clear
                </Button>
            </Group>
            <Text className={classes.header}>Score Details:</Text>
            <Group>
                <TextInput
                    label="Enter Accuracy"
                    type="number"
                    placeholder="0-101 (%)"
                    required
                    value={scoreAccInput}
                    onChange={handleAccInput}
                    error={accInputError}
                    disabled={forScoreChart ? false : true}
                />
                <Divider />
                <TextInput
                    label="Score Rating"
                    value={scoreRating ? scoreRating : "<rating (calculated)>"}
                    variant="filled"
                    disabled
                />
            </Group>
            <Button onClick={createScoreAndAddToUser} disabled={accInputError ? true : false} className={classes.button}>
                Create Score
            </Button>
        </Fieldset>
    )
}

export default AddScoreFields;