'use client';

import React from 'react';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';


export default function TelemetryNavbar () {
    return (
        <Paper sx={{
            '@media print': {
                display: 'none'
            },
            p: 1
        }} elevation={3}>
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Link href='/telemetry/workplaces'>Рабочие места</Link>
                <Link href='/telemetry/machines'>Машины</Link>
                <Link href='/telemetry/reports'>Отчеты</Link>
            </Stack>
        </Paper>
    );
}