import { useEffect, useState } from 'react';
import { getAllCharts } from '../../services/ChartService'
import { Chart } from '../../models/Chart';
import { Box, Group, Stack, Table, Text, UnstyledButton } from '@mantine/core';
import classes from './chartslist.module.css'
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';
import React from 'react';

const getDifficultyClass = (chart: Chart) => {
    if (chart.difficulty === "remaster") return classes.remaster;
    if (chart.difficulty === "master") return classes.master;
    if (chart.difficulty === "expert") return classes.expert;
}

const getDifficultyText = (chart: Chart) => {
    if (chart.difficulty === "remaster") return "Re:MASTER";
    if (chart.difficulty === "master") return "MASTER";
    if (chart.difficulty === "expert") return "EXPERT";
}

const getLevel = (chart: Chart) => {
    const intInternalLevel = +chart.internalLevel;
    const integerPart = Math.floor(intInternalLevel);
    const decimalPart = intInternalLevel - integerPart;
    return decimalPart >= 0.6 ? `${integerPart}+` : `${integerPart}`
}

interface HeaderProps {
    children: React.ReactNode;
    sorted: boolean;
    reversed: boolean;
    sort(): void;
}

function TableHeader({ children, sorted, reversed, sort }: HeaderProps) {
    const SortIcon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

    return (
        <Table.Th>
            <UnstyledButton onClick={sort}>
                <Group>
                    <Text className={classes.header}>{children}</Text>
                    <SortIcon className={classes.sortIcon}></SortIcon>
                </Group>
            </UnstyledButton>
        </Table.Th>
    )
}

function sortCharts(
    charts: Chart[],
    info: { sortBy: keyof Chart; isReverse: boolean }
) {
    const { sortBy } = info;
    return [...charts].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        // Sorting for numbers
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return info.isReverse ? bValue - aValue : aValue - bValue;
        }

        // Sorting for strings
        if (typeof aValue === 'string' && typeof bValue === 'string') {

            return info.isReverse ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        }

        // Default comparison if types do not match or are unsupported
        return 0;
    });
}


const ChartsList: React.FC = () => {
    const [charts, setCharts] = useState<Chart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [sortBy, setSortBy] = useState<keyof Chart | null>(null)
    const [reverseSort, setReverseSort] = useState<boolean>(false)

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
            <Table.Td className={getDifficultyClass(chart)}>{getDifficultyText(chart)}</Table.Td>
            <Table.Td className={getDifficultyClass(chart)}>{getLevel(chart)}</Table.Td>
            <Table.Td className={getDifficultyClass(chart)}>{chart.internalLevel}</Table.Td>
            <Table.Td>{chart.type.toUpperCase()}</Table.Td>
            <Table.Td>{chart.new === 1 && "new"}</Table.Td>
        </Table.Tr>
    )

    const setSorting = (field: keyof Chart) => {
        // sets reverse only if field is being sorted already
        const isReverse = (field === sortBy ? !reverseSort : false);
        setReverseSort(isReverse);
        setSortBy(field);
        setCharts(sortCharts(charts, { sortBy: field, isReverse }))
    }

    return (
        <Box className={classes.page}>
            <Stack className={classes.stack}>
                {loading && <p>loading data</p>}
                {error && <p>{error}</p>}
            </Stack>
            <Table highlightOnHover>
                <Table.Thead>
                    <TableHeader
                        sorted={sortBy === "id"}
                        reversed={reverseSort}
                        sort={() => setSorting("id")}
                    >
                        ID
                    </TableHeader>
                    <TableHeader
                        sorted={sortBy === "song"}
                        reversed={reverseSort}
                        sort={() => setSorting("song")}
                    >
                        Song Name
                    </TableHeader>
                    <TableHeader
                        sorted={sortBy === "difficulty"}
                        reversed={reverseSort}
                        sort={() => setSorting("difficulty")}
                    >
                        Difficulty
                    </TableHeader>
                    <Table.Th>
                        <Text>Level</Text>
                    </Table.Th>
                    <TableHeader
                        sorted={sortBy === "internalLevel"}
                        reversed={reverseSort}
                        sort={() => setSorting("internalLevel")}
                    >
                        Internal Level
                    </TableHeader>
                    <TableHeader
                        sorted={sortBy === "type"}
                        reversed={reverseSort}
                        sort={() => setSorting("type")}
                    >
                        Type
                    </TableHeader>
                    <TableHeader
                        sorted={sortBy === "new"}
                        reversed={reverseSort}
                        sort={() => setSorting("new")}
                    >
                        Is New
                    </TableHeader>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Box>
    )
}

export default ChartsList;