'use client';

import React, { useState, useEffect } from "react";
import { Box, Stack, Button, Table, TableHead, TableBody, TableRow, TableCell, Typography, Divider} from "@mui/material";
import ReportPageHeader from "@/app/_components/ReportPageHeader";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";



export default function DailyReport () {
    const today = dayjs();
    const pageTitle = 'Дневной отчет';
    const [date, setDate] = useState(today);
    const [defectData, setDefectData] = useState([]);
    const [processData, setProcessData] = useState([]);

    const formatDateForAPI = (date) => {
        return dayjs(date).format('YYYY-MM-DD');
    };

    useEffect(() => {
        fetchDefectData();
        fetchProcessData();
    },[date])

    const fetchDefectData = async () => {
        try {
            const response = await axios.get(`***`)
            setDefectData(response.data)
            
        } catch (error) {'Ошибка при загрузке данных по браку:', error}
    }

    const fetchProcessData = async () => {
        try {
            const response = await axios.get(`***`)
            setProcessData(response.data)
        } catch (error) {'Ошибка при загрузке данных по браку:', error}
    }

    const printClick = () => {
        window.print();
    };

    console.log(processData)
    console.log(defectData)

    return(
        <Box sx={{pt:2}}>
            <Stack direction='row' spacing={2} sx={{'@media print' : {display:'none'}}}>
                <Button onClick={printClick} color="info">Печать</Button>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                            label="Выберите дату"
                            value={date}
                            onChange={(date) => setDate(date)}
                            sx={{px:2}}
                        />
                </LocalizationProvider>
            </Stack>
            <Divider sx={{pt:2}}/>
            <Box sx={{}}>
                <ReportPageHeader pageTitle={pageTitle} date={date}/>
                <Typography><u>Процессы:</u></Typography>
                {processData.length > 0 ? (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><i>Продукт</i></TableCell>
                                <TableCell><i>Серия</i></TableCell>
                                <TableCell><i>Тип процесса</i></TableCell>
                                <TableCell><i>Оборудование</i></TableCell>
                                <TableCell><i>Время начала</i></TableCell>
                                <TableCell><i>Время окончания</i></TableCell>
                                <TableCell><i>Трудозатраты</i></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {processData.map(process => (
                                <TableRow key={process.id}>
                                    <TableCell>{process.product}</TableCell>
                                    <TableCell>{process.serie}</TableCell>
                                    <TableCell>{process.process_type}</TableCell>
                                    <TableCell>{process.machine}</TableCell>
                                    <TableCell>{process.start_time}</TableCell>
                                    <TableCell>{process.end_time}</TableCell>
                                    <TableCell>{process.capacity}</TableCell>
                                </TableRow>                         
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Typography>Нет данных</Typography>
                )}
                <Typography sx={{pt:1}}><u>Качество:</u></Typography>
                {defectData.length > 0 ? (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><i>Продукт</i></TableCell>
                                <TableCell><i>Серия</i></TableCell>
                                <TableCell><i>Тип процесса</i></TableCell>
                                <TableCell><i>Всего сделано</i></TableCell>
                                <TableCell><i>Забраковано</i></TableCell>
                                <TableCell><i>Процент брака</i></TableCell>
                                <TableCell><i>Комплектующее</i></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {defectData.map(defect => (
                                <TableRow key={defect.id}>
                                    <TableCell>{defect.product}</TableCell>
                                    <TableCell>{defect.serie}</TableCell>
                                    <TableCell>{defect.process_type}</TableCell>
                                    <TableCell>{defect.total_done_good}</TableCell>
                                    <TableCell>{defect.total_done_defect}</TableCell>
                                    <TableCell>{defect.defect_rate}</TableCell>
                                    <TableCell>{defect.component}</TableCell>
                                </TableRow>                         
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Typography>Нет данных</Typography>
                )}


            </Box>
        </Box>
    );
}