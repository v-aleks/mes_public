import { Box } from "@mui/material"
import ReactECharts from 'echarts-for-react';


export default function WorkplaceReportChart ({workPlace}) {
    const formatPeriods = (periods, type) => {
        return periods.map(period => ([
            {
                name: '',
                xAxis: new Date(period[0]).toISOString(), 
                itemStyle: {
                    color: type === 'Work' ? 'rgba(0, 255, 0, 0.4)' : 'rgba(255, 0, 0, 0.4)'
                }
            },
            {
                xAxis: new Date(period[1]).toISOString()
            }
        ]));
    };

    const allPeriods = [
        ...(workPlace.work_periods || []),
        ...(workPlace.idle_periods || [])
    ].sort((a, b) => new Date(a[0]) - new Date(b[0]));

    const chartData = allPeriods.map(period => [new Date(period[0]).toISOString(), new Date(period[1]).toISOString()]);

    const markAreas = [
        ...formatPeriods(workPlace.work_periods || [], 'Work'),
        ...formatPeriods(workPlace.idle_periods || [], 'Idle')
    ];

    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false,
            axisLabel: {
                formatter: (value) => new Date(value).toLocaleTimeString()
            }
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: [
            {
                name: '001',
                type: 'line',
                smooth: true,
                data: chartData,
                lineStyle: {
                    opacity: 0 
                },
                markArea: {
                    data: markAreas
                }
            }
        ]
    };

    return (
        <Box>
            {(!workPlace.work_periods || workPlace.work_periods.length === 0) ? (
            <p>Загрузка...</p>
        ) : (
            <ReactECharts
            option={options}
            style={{ height: '100px', minWidth: '700px' }}
            />    
        )}
        </Box>
    )
}