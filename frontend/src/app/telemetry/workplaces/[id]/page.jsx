'use client'

import { React, useState, useEffect } from "react";
import axios from "axios";
import { useMachinesStore } from "@/app/_stores/MachinesStore/MachinesStoreProvider";
import dayjs from "dayjs";
import { Box, Divider, Stack, Paper, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import WorkplaceReportChart from "./_components/WorkplaceReportChart";
import WorkplaceReportTable from './_components/WorkplaceReportTable';

export default function WorkplaceReport({ params }) {
    const [date, setDate] = useState(dayjs());
    const [workPlace, setWorkPlace] = useState([]);
    const store = useMachinesStore();

    useEffect(() => {
        fetchWorkPlace();
    }, [date]);

    async function fetchWorkPlace() {
        try {
            let url = store.workplaceBaseEndpont;
            url += `?sensor_id=${params.id}&date=${date.format('YYYY-MM-DD')}`;
            const response = await axios.get(url);
            setWorkPlace(response.data);
        } catch (error) {
            console.error('WORKPLACE Data:', error);
        }
    }

    console.log(workPlace);

    return (
        <Box sx={{my:2}}>
            <Typography variant="h6">Рабочее место {params.id}</Typography>
            <Divider sx={{my:2}}/>
            <Box sx={{ '@media print': { display: 'none' } }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction='row' spacing={2}>
                        <DatePicker
                            label="Выберите дату"
                            value={date} 
                            onChange={(newDate) => setDate(newDate)}  
                            sx={{ px: 2 }}
                        />
                    </Stack>
                </LocalizationProvider>
                <Divider sx={{ py: 2 }} />
            </Box>
            <Paper sx={{my:2, p:2}} elevation={3}>
                <WorkplaceReportChart workPlace={workPlace} />
                <WorkplaceReportTable workPlace={workPlace} />
            </Paper>
        </Box>
    );
}
