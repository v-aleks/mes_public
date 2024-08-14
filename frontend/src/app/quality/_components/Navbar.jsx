'use client';

import React from 'react';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Divider, Box } from '@mui/material';


export default function QualityNavbar () {
    return (
        <Box sx={{pb:1}}>
            <Paper sx={{
                '@media print': {
                    display: 'none'
                },
                p: 1
            }} elevation={3}>
                <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                    <Link href='/quality/reports'>Отчеты</Link>
                </Stack>
            </Paper>
        </Box>
    );
}