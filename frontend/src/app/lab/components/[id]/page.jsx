'use client';

import { React, useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Box, Typography, Stack, Button } from "@mui/material";


export default function ComponentDetail({params}) {
    const [component, setComponent] = useState([]);

    useEffect(() => {
        fetchComponent();
      }, []);
    
    const fetchComponent = async () => {
        try {
            const response = await axios.get(`***`);
            setComponent(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке проектов:', error);
        }
    };

    return (
        <Box>
            <Stack direction='row' spacing={2}>
                <Link href='/lab/components/'>
                    <Button size="small" color='warning'>Назад к компонентам</Button>            
                </Link>
                <Link href={`***`} target="blank">
                    <Button size="small" color='warning'>Изменить компонент</Button>            
                </Link>
            </Stack>
            <Typography sx={{pt:2}} variant="h6">Название: {component.name}</Typography>
            <Typography variant="h6">Номенклатура 1С: {component.title_1c}</Typography>
            <Typography variant="h6">Сокращенное наименование: {component.short_name}</Typography>
        </Box>
    );
}