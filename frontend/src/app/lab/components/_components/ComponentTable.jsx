'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function ComponentTable() {
    const [components, setComponents] = useState([]);

    useEffect(() => {
        fetchComponents();
      }, []);
    
    const fetchComponents = async () => {
        try {
            const response = await axios.get('***');
            setComponents(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке проектов:', error);
        }
    };
    

    return (
        <Box>
            <TableContainer>
                <Paper elevation={2}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell><i>Название</i></TableCell>
                                <TableCell><i>Номенклатура 1С</i></TableCell>
                                <TableCell><i>Сокращенное наименование</i></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {components.length > 0 ? (
                                components.map(component => (
                                    <TableRow key={component.id}>
                                        <TableCell><Link href={`/lab/components/${component.id}/`}>{component.name}</Link></TableCell>
                                        <TableCell>{component.title_1c}</TableCell>
                                        <TableCell>{component.short_name}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>Загрузка...</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </TableContainer>
        </Box>
    );
}