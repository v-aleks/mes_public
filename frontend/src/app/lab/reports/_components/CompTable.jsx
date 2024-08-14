'use client';

import { React, useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";


export default function CompTable ({startDate, endDate}) {
    const formatStartDate = startDate.toISOString().split('T')[0]
    const formatEndDate = endDate.toISOString().split('T')[0]
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        fetchReportData();
    }, [startDate, endDate])

    const fetchReportData = async () => {
        try {
            const response = await axios.get(`***`)
            setReportData(response.data)
        } catch (error) {console.log('Ошибка при получении данных', error)}
    }



    return (
        <Box sx={{pt:2}}>
            <Typography variant="h6">Расход сырья на RnD за период {format(formatStartDate, 'dd.MM.yyyy')} - {format(formatEndDate, 'dd.MM.yyyy')}</Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong><i>Номенклатура</i></strong></TableCell>
                            <TableCell><strong><i>Расход за период, гр</i></strong></TableCell>
                        </TableRow>
                    </TableHead>            
                    <TableBody>
                    {reportData.length >0 ? (reportData.map(component => (
                        <TableRow key={component.component_id}>
                            <TableCell>{component.component_title_1c == '-' ? `${component.component_name} (нет в 1С)` : `${component.component_title_1c}` }</TableCell>
                            <TableCell>{component.concentration}</TableCell>
                        </TableRow>

            ))) : (
                <p>Загрузка...</p>
            )}
                    </TableBody>
                </Table>  
        </Box>
    );
}