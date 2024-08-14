'use client';

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";

export default function Sync() {
    const [sync, setSync] = useState([]);
    const API_SYNC_URL = '***'

    useEffect(() => {
        syncData();
    }, [])

    const syncData = async () => {
        try {
            const response = await axios.get(API_SYNC_URL)
            setSync(response.data)
        } catch (error) {'Ошибка при синхронизации данных:', error}
    }
    return (
        <Box sx={{pt:2}}>
            {sync}
        </Box>
    );
}