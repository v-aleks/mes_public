'use client';
import { React } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Logos1Sensor } from "@/app/_utils/sensorClasses";
import WorkplaceSensor from "./_components/WorkplaceSensor";
import { useMachinesStore } from '@/app/_stores/MachinesStore/MachinesStoreProvider';



export default function WorkplacesList() {
    const store = useMachinesStore()

    const sensor001 = store.workplace001
    const sensor002 = store.workplace002

    return (
            <Box sx={{pt:2}}>
                <div>
                    <Typography variant="h6">Комплектовочный цех:</Typography>
                </div>
                <div>
                    <Paper elevation={3}>
                        <WorkplaceSensor sensor={sensor001}/>
                        <WorkplaceSensor sensor={sensor002}/>
                    </Paper>
                </div>
            </Box>
    );
}