import React from "react";
import ReactECharts from 'echarts-for-react';

export default function DefectDashChart ({data}) {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
          data: data ? data.map(entry => entry.date) : [],
        },
        yAxis: {
            name: 'Средний процент брака',
            nameLocation: 'middle',
            nameGap: 40,
        },
        series: [
          {
            data: data ? data.map(entry => entry.daily_defect_rate) : [],
            type: 'line',
            color: '#f97316',
            markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
          }
        ]
    };
    return (
        <ReactECharts
                option={option}
                style={{
                    minHeight: '400px',
                    minWidth: '800px',
                    height: '100%',
                    width: '100%',
                }}
        />
    );
}