'use client';

import React from "react";
import { format } from 'date-fns'
import { Box, Typography, Divider } from "@mui/material";


export default function ReportPageHeader ({pageTitle, date}) {
    const reportDate = format(date.toISOString(), 'dd.MM.yyyy')
    return (
        <Box sx={{pb:1}}>
            <Typography sx={{py:2}} variant="h6">{pageTitle} за {reportDate}</Typography>
            <Divider/>
        </Box>
    );
}