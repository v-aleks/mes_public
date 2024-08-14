'use client';

import { React, useState, useEffect } from "react";
import { Typography } from "@mui/material";

export default function DatabaseStatus () {
    const [status, setStatus] = useState('Loading...');

    const API_URL = '***'

    useEffect(() => {
        const fetchStatus = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setStatus(data.database_status);
        } catch (error) {
            setStatus('Ошибка при получении статуса базы данных: ' + error);
        }
        };

        fetchStatus();
    }, []);

    return (
        <>
        {status == 'Connected' ? (
            <Typography variant='h6' color='success.main'>{status}</Typography>
        ) : (
            <Typography variant='h6' color='error.main'>{status}</Typography>
        )}
        </>
    );
}