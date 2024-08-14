'use client';

import React from "react";
import Link from "next/link";
import { Box, Divider, Stack, Typography } from "@mui/material";
import TubeChart from "./_components/TubeChart";
import { useMachinesStore } from '@/app/_stores/MachinesStore/MachinesStoreProvider';
import TubeTable from "./_components/TubeTable";



export default function MachinesList() {
    const machinesStore = useMachinesStore();

    return (
        <Box sx={{pt:2}}>
            <Typography variant="h5">Список оборудования:</Typography>
            <Divider sx={{pt:2}}/>
            <Link href={`/telemetry/machines/${machinesStore.machineURL}/`}>
                <Typography sx={{pt:2}} variant="h6" color='warning.light'>{machinesStore.machineName}</Typography>
            </Link>
            <Stack direction='row' spacing={2}>
                <TubeChart />
                <TubeTable/>
            </Stack>
        </Box>
    );
}