'use client';

import React from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";


export default function ProductionReportList () {
    return (
        <Box sx={{pt:2}}>
            <Link href='/production/reports/daily'>
                <Button color="warning">
                    Отчет за день
                </Button>
            </Link>
        </Box>
    );
}