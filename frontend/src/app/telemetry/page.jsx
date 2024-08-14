'use client';

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import DatabaseStatus from "./_components/DbStatus";

export default function TelemetryPage() {

    return(
        <Box sx={{pt:2}}>
            <Typography variant="h5">Базы данных:</Typography>
            <Typography variant="h6">
                <Stack direction='row' spacing={1}>
                    <div>
                        Logos и Logos1:
                    </div>
                     <DatabaseStatus/>
                </Stack>
            </Typography>

        </Box>
    );
}