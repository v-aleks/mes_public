'use client';

import React, { useState } from "react";
import dayjs from 'dayjs';
import { Box, Divider, Stack, Paper } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TubeTable from '../_components/TubeTable';
import TubeChart from '../_components/TubeChart';

export default function MachineDetail() {
    const today = dayjs();
    const [date, setDate] = useState(today);

    const printClick = () => {
        window.print();
    };

    const formatDateForAPI = (date) => {
        return dayjs(date).format('YYYY-MM-DD');
    };

  return (
    <Box sx={{
        pt:2,
        }}>
        <Box sx={{'@media print': {display: 'none'}}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction='row' spacing={2}>
                   {/* <Button onClick={printClick} size="small" color="info">Печать</Button> */} 
                    <DatePicker
                        label="Выберите дату"
                        value={date}
                        onChange={(date) => setDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{px:2}}
                    />
                </Stack>
            </LocalizationProvider>
            <Divider sx={{py:2}}/>
        </Box>
        <Paper sx={{p:2, my:1, '@media print':{boxShadow:'none'}}} elevation={3}>
            <TubeChart date={formatDateForAPI(date)} />
            <TubeTable date={formatDateForAPI(date)} />
        </Paper>
    </Box>
  );
}
