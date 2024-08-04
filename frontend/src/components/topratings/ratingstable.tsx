import { Table, Tooltip } from "@mantine/core"
import { Settings } from "../../contexts/settingscontext";
import { useEffect, useState } from "react";
import { Score } from "../../models/Score";
import { getScoresById } from "../../services/UserService";
import { IconTrash } from "@tabler/icons-react";
import { deleteScoreById } from "../../services/ScoreService";

const RatingsTable: React.FC = () => {
    const [topScores, setTopScores] = useState<Score[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = Settings();

    useEffect(() => {
        if (user) {
            const fetchScores = async () => {
                try {
                    setLoading(true);
                    const res = await getScoresById(user.userId);
                    const sortedScores = res.data.sort((a: Score, b: Score) => b.scoreRating - a.scoreRating);
                    setTopScores(sortedScores);
                } catch (err) {
                    setError("Failed getting top scores")
                } finally {
                    setLoading(false)
                }
            };

            fetchScores();
        }
    }, []);

    const deleteScore = async (scoreId: number) => {
        try {
            await deleteScoreById(scoreId);
            setTopScores(topScores.filter(score => score.scoreId !== scoreId));
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

    if (loading) return <p>loading scores...</p>
    if (error) return <p>failed to get scores</p>

    return (
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
    )
}

export default RatingsTable;