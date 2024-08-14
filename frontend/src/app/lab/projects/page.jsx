'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from '@/app/_utils/axiosConfig'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, Paper } from '@mui/material';
import { projectsURL } from '@/app/_utils/API_URLS';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(projectsURL);
            console.log('Response:', response.data); // Debugging: Log the full response
                setProjects(response.data);
                console.log(projects)
        } catch (error) {
            console.error('Ошибка при загрузке проектов:', error);
            if (error.response) {
                console.error('Response data:', error.response.data); // Log error response data
            }
        }
    };

    return (
        <div>
            <Typography sx={{ p: 2 }} variant='h5'>
                Список проектов:
            </Typography>
            <Paper elevation={3}>
            <TableContainer>
                <Table sx={{ minWidth: 650, p: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Название продукта</strong></TableCell>
                            <TableCell><strong>Описание</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(projects) ? projects.map(project => (
                            <TableRow 
                                key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell><Typography color='warning.main'><Link href={`/lab/projects/${project.id}`}>{project.name}</Link></Typography></TableCell>
                                <TableCell>{project.description}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={2}>Нет данных</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
    );
};

export default ProjectList;
