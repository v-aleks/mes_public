'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useMachinesStore } from "@/app/_stores/MachinesStore/MachinesStoreProvider";
import { getTableReport } from "@/app/_utils/functions";

export default function TubeTable({ date }) {
    const store = useMachinesStore();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (!date) {
            fetchTableData();
        } else {
            fetchReportData();
        }
        // TODO: Добавить таймер для получения данных в реальном времени
    }, [date]);

    const fetchTableData = async () => {
        const API_URL = store.monitorTableAPI;
        try {
            const response = await axios.get(API_URL);
            setTableData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            const empty = 'Нет данных'
            setTableData(empty)
        }
    };

    const fetchReportData = async () => {
        const API_REPORT_URL = getTableReport(date);
        try {
            const response = await axios.get(API_REPORT_URL);
            setTableData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных отчета:', error);
            const empty = 'Нет данных'
            setTableData(empty)
        }
    };

    console.log(tableData)

    return (
        <Box sx={{ py: 2 }}>
            {tableData != 'Нет данных' ? (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Параметр</TableCell>
                            <TableCell>Значение параметра</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Начало процесса</TableCell>
                            <TableCell>{tableData.start_work_time}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Окончание процесса</TableCell>
                            <TableCell>{tableData.end_work_time}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Всего произведено</TableCell>
                            <TableCell>{tableData.total_done_show}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Длительность</TableCell>
                            <TableCell>{tableData.duration_time}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Производительность</TableCell>
                            <TableCell>{tableData.productivity_norm}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Период низкой производительности</TableCell>
                            <TableCell>{tableData.low_prod_mins}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Период простоя</TableCell>
                            <TableCell>{tableData.downtime_mins}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            ) : (
                <Typography>Данные отсутствуют {date ? 'для выбранной даты' : ''}</Typography>
            )}
        </Box>
    );
}
