import { Chart } from "./Chart";

export interface Score {
    scoreId: number;
    userId: number;
    chartId: number;
    accuracy: number;
    scoreRating: number;
    
    chart?: Chart;
}