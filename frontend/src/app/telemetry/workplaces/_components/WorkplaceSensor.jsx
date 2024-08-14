'use client';
import { React, useState, useEffect } from "react";
import ReactECharts from 'echarts-for-react';
import axios from "axios";
import { Box } from "@mui/material";


export default function WorkplaceSensor ({sensor}) {
    console.log(sensor)
    const [workPlace, setWorkPlace] = useState({});

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            let url = sensor.getApiEndpoint(sensor.sensor_id);
            const response = await axios.get(url);
            setWorkPlace(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setWorkPlace({});
        }
    };

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
        title: {
            text: `${sensor.name}`,
            textStyle: {
                color: '#999999'
            }
        },
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
                    opacity: 0  // Удаление линии графика
                },
                markArea: {
                    data: markAreas
                }
            }
        ]
    };



    return (
        <Box sx={{p:1}}>
        {(!workPlace.work_periods || workPlace.work_periods.length === 0) ? (
            <p>Загрузка...</p>
        ) : (
            <ReactECharts
            option={options}
            style={{ height: '100px', minWidth: '700px' }}
            />    
        )}
        </Box>
    );
}

