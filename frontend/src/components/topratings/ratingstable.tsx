import { Group, Table, Text, Tooltip } from "@mantine/core"
import { Settings } from "../../contexts/settingscontext";
import { useEffect, useState } from "react";
import { Score } from "../../models/Score";
import { getScoresById, getUserFromId, updateRatingById } from "../../services/UserService";
import { IconRefresh, IconTrash } from "@tabler/icons-react";
import { deleteScoreById } from "../../services/ScoreService";

const RatingsTable: React.FC = () => {
    const [topScores, setTopScores] = useState<Score[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user, loginUser } = Settings();

    const fetchScores = async () => {
        if (user) {
            try {
                setLoading(true);
                const res = await getScoresById(user.userId);
                const sortedScores = res.data.sort((a: Score, b: Score) => b.scoreRating - a.scoreRating);
                setTopScores(sortedScores);
            } catch (err) {
                setError("Failed getting top scores");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchScores();
    }, [user]);

    const deleteScore = async (scoreId: number) => {
        try {
            await deleteScoreById(scoreId);
            setTopScores(topScores.filter(score => score.scoreId !== scoreId));
            if (user) {
                await updateRatingById(user.userId);
                const updatedUser = await getUserFromId(user.userId);
                loginUser(updatedUser)
            }
        } catch (err) {
            setError("failed to delete score")
        }
    }

    const rows = topScores.map((score, index) =>
        <Table.Tr>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{score.chart?.song}</Table.Td>
            <Table.Td>{score.scoreRating}</Table.Td>
            <Table.Td>{score.accuracy}</Table.Td>
            <Table.Td>{score.chart?.internalLevel}</Table.Td>
            <Table.Td>{score.chart?.difficulty}</Table.Td>
            <Table.Td>
                <Tooltip label="Delete score?" position="bottom" withArrow>
                    <IconTrash
                        size={18}
                        color="red"
                        style={{ cursor: 'pointer' }}
                        onClick={() => deleteScore(score.scoreId)}
                    />
                </Tooltip>
            </Table.Td>
        </Table.Tr>
    )

    return (
        <>
            <Group>
                <Tooltip label="Refresh scores" style={{ cursor: 'pointer' }} onClick={() => fetchScores() }>
                    <IconRefresh size={24} />
                </Tooltip>
                <Text>Your current rating is: {user?.rating}</Text>
                {loading && <Text>loading scores...</Text>}
            </Group>

            {error && <p>failed to get scores</p>}

            <Table>
                <Table.Thead>
                    <Table.Th>Top #</Table.Th>
                    <Table.Th>Song</Table.Th>
                    <Table.Th>Rating</Table.Th>
                    <Table.Th>Accuracy</Table.Th>
                    <Table.Th>Internal Level</Table.Th>
                    <Table.Th>Difficulty</Table.Th>
                    <Table.Th>Delete?</Table.Th>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    )
}

export default RatingsTable;