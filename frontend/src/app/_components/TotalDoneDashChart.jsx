import React from "react";
import ReactECharts from 'echarts-for-react';

export default function TotalDoneDashChart ({data}) {
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
          data: data ? data.map(entry => entry.date) : [],
        },
        yAxis: {
            name: 'Всего произведено',
            nameLocation: 'middle',
            nameGap: 60,
        },
        series: [
          {
            data: data ? data.map(entry => entry.avg_daily_total_done) : [],
            type: 'line',
            areaStyle: {},
            smooth: true,
            color: '#f97316',
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