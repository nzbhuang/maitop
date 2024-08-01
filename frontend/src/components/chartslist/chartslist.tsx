import { useEffect } from 'react';
import { getAllCharts }  from '../../services/ChartService'


const ChartsList = () => {

    useEffect(() => {
        const charts = getAllCharts();
    })

    return (
        <p>Charts</p>
    )
}

export default ChartsList;