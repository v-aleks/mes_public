'use client';

import React, { useState } from "react";
import dayjs from 'dayjs';
import { Box, Divider, Stack, Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CompTable from "../_components/CompTable";

export default function LabComponentsPeriod() {
    const today = dayjs();
    const sevenDaysAgo = dayjs().subtract(7, 'day');

    const [startDate, setStartDate] = useState(sevenDaysAgo);
    const [endDate, setEndDate] = useState(today);

    const printClick = () => {
        window.print();
    };

    return (
        <Box sx={{p:2}}>
            <Box sx={{'@media print': {display: 'none'}}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction='row' spacing={2}>
                        <Button onClick={printClick} size="small" color="info">Печать</Button>
                        <DatePicker
                            label="Начало периода"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{px:2}}
                        />
                        <DatePicker
                            label="Конец периода"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{px:2}}
                        />
                    </Stack>
                </LocalizationProvider>
                <Divider sx={{py:2}}/>
            </Box>
            <CompTable startDate={startDate} endDate={endDate} />
        </Box>
    );
}
