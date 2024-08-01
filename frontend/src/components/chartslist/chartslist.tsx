import { useEffect, useState } from 'react';
import { getAllCharts }  from '../../services/ChartService'
import { Chart } from '../../models/Chart';
import { Table } from '@mantine/core';


const ChartsList = () => {
    const [charts, setCharts] = useState<Chart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCharts = async () => {
            try {
                const res = await getAllCharts();
                setCharts(res.data);
            }
            catch (err) {
                setError("Failed to fetch charts");
            }
            finally {
                setLoading(false);
            }
        }
        fetchCharts();
    }, []);

    const rows = charts.map((chart) =>
        <Table.Tr>
            <Table.Td>{chart.id}</Table.Td>
            <Table.Td>{chart.song}</Table.Td>
            <Table.Td>{chart.difficulty}</Table.Td>
            <Table.Td>{chart.internalLevel}</Table.Td>
            <Table.Td>{chart.type}</Table.Td>
            <Table.Td>{chart.new === 1 && "new"}</Table.Td>
        </Table.Tr>
    )

    const headers = (
        <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Song Name</Table.Th>
            <Table.Th>Difficulty</Table.Th>
            <Table.Th>Internal Level</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>New</Table.Th>
        </Table.Tr>
    )

    return (
        <>
            {loading && <p>loading data</p>}
            {error && <p>{error}</p>}
            <Table>
                <Table.Thead>{headers}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
        
    )
}

export default ChartsList;