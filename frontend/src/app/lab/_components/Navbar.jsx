'use client';

import React from 'react';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Divider, Box } from '@mui/material';


export default function LabNavbar () {
    return (
        <Box sx={{pb:1}}>
            <Paper sx={{
                '@media print': {
                    display: 'none'
                },
                p: 1
            }} elevation={3}>
                <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                    <Link href='/lab/projects'>Проекты</Link>
                    <Link href='/lab/recipes'>Рецептуры</Link>
                    <Link href='/lab/components'>Компоненты</Link>
                    <Link href='/lab/polls'>Обратная связь</Link>
                    <Link href='/lab/reports'>Отчеты</Link>
                    <Link href='/lab/recipes/url'>Рецепт из ссылки</Link>
                </Stack>
            </Paper>
        </Box>
    );
}