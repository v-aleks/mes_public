'use client'

import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import ReactECharts from 'echarts-for-react';
import { useMachinesStore } from "@/app/_stores/MachinesStore/MachinesStoreProvider";
import { getChartReport } from "@/app/_utils/functions";

import { Box } from "@mui/material";

export default function TubeChart({date}) {
    const store = useMachinesStore()
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!date) {
            fetchChartData();
        } else {
            fetchReportData();
        }
    }, [date]);

    const fetchChartData = async () => {
        const API_URL = store.monitorChartAPI;
        try {
            const response = await axios.get(API_URL);
            setChartData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных графика:', error);
        }
    };

    const fetchReportData = async () => {
        const API_REPORT_URL = getChartReport(date);
        try {
            const response = await axios.get(API_REPORT_URL);
            setChartData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных графика отчета:', error);
        }
    };

    console.log(chartData)

    const processDataForPlot = () => {
        const times = chartData.map(entry => {
            const date = new Date(entry.time_line);
            return date.toTimeString().split(' ')[0].slice(0, 5); // Format time as HH:MM
        });

        const clicks = chartData.map(entry => entry.click);
        const averageClick = clicks.reduce((acc, click) => acc + click, 0) / clicks.length;

        const colors = clicks.map(click => {
            if (click >= averageClick) return 'green';
            if (click >= averageClick * 0.8) return 'yellow';
            if (click >= averageClick * 0.5) return 'orange';
            return 'red';
        });

        return { times, clicks, colors, averageClick };
    };

    const { times, clicks, colors } = processDataForPlot();
    
    const option = {
    title: {
    },
    tooltip: {},
    xAxis: {
        data: times,
        axisLabel: {
            formatter: '{value}'
        }
    },
    yAxis: {
        name: 'Произведено за период',
        nameLocation: 'middle',
        nameGap: 40,
    },
    series: [{
        type: 'bar',
        data: clicks.map((click, index) => ({
            value: click,
            itemStyle: {
                color: colors[index]
            }
        })),
        label: {
            show: true,
            position: 'top',
        },
    }]
    };

    return(
        <Box sx={{
            pt:2,
            '@media print' : {maxWidth: '350px'}
        }}>
            {chartData.length > 0 ? (
                <ReactECharts
                option={option}
                style={{
                    minHeight: '300px',
                    minWidth: '500px',
                }}
                />
            ):('Телеметрия не доступна')}
        </Box>
    );
}