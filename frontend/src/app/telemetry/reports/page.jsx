'use client';

import React from "react";
import Link from "next/link";
import { Box, Grid, Typography, Divider, Button, Stack } from "@mui/material";
import { useMachinesStore } from '@/app/_stores/MachinesStore/MachinesStoreProvider';


export default function TelemetryReportList () {
    const store = useMachinesStore()

    return (
        <Box sx={{py:2}}>
            <Typography variant="h5">Отчеты телеметрии</Typography>
            <Divider sx={{my:2}}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack direction='column' spacing={2}>
                        <Typography variant="h6">Оборудование:</Typography>
                        <Link href={`/telemetry/machines/${store.machineURL}`}>
                            <Button size='small' color="warning">Тубонаполнительная машина К-3</Button>
                        </Link>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack direction='column' spacing={2}>
                        <Typography variant="h6">Рабочие места:</Typography>
                        <Link href={`/telemetry/workplaces/${store.workplace001.sensor_id}`}>
                            <Button size='small' color="warning">Рабочее место 001</Button>
                        </Link>
                        <Link href={`/telemetry/workplaces/${store.workplace002.sensor_id}`}>                       
                            <Button size='small' color="warning">Рабочее место 002</Button>
                        </Link>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}