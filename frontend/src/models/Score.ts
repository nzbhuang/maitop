import { Chart } from "./Chart";

export interface Score {
    scoreId: number;
    userId: number;
    chartId: number;
    accuracy: number;
    chartRating: number;
    
    chart?: Chart;
}