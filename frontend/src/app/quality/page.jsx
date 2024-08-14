'use client';

import React from "react";
import { Box, Grid} from "@mui/material";
import QualityCard from "./_components/QualityCard";
import QualityCompTable from "./_components/QualityCompTable";
import QualityMachineTable from "./_components/QualityMachineTable";
import QualityDRChart from "./_components/QualityDRChart";

export default function QualityDashboard () {
    return (
        <Box sx={{pt:2}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <QualityCard/>
                    <QualityCompTable/>
                    <QualityMachineTable/>
                </Grid>
                <Grid item xs={9}>
                    <QualityDRChart />
                </Grid>
            </Grid>
        </Box>
    );
}