import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import { Chart } from "../models/Chart";
import React from "react";
import { getAllCharts } from "../services/ChartService";

interface ChartsContextItems {
    charts: Chart[];
    setCharts: Dispatch<SetStateAction<Chart[]>>;
    loading: boolean;
    error: string | null;
}

const ChartsContext = createContext<ChartsContextItems | undefined>(
    undefined
);

export const ChartsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [charts, setCharts] = useState<Chart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        if (charts.length === 0) {
            fetchCharts();
        }
    }, []);

    return (
        <ChartsContext.Provider
            value={{
                charts,
                setCharts,
                loading,
                error,
            }}
        >
            {children}
        </ChartsContext.Provider>
    )
}

export const UseCharts = () => {
    {
        const context = useContext(ChartsContext)
        if (context === undefined) {
            throw new Error('UseCharts must be used within a ChartsProvider');
        }
        return context;
    }
};