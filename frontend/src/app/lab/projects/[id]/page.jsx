'use client';

import { React, useState, useEffect } from "react";
import axios from '@/app/_utils/axiosConfig'
import Link from "next/link";


import { Typography, Box, Divider, Button } from "@mui/material";
import TaskList from "./_components/TaskList";

export default function ProjectDetail({params}) {

    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchProject();
        fetchTasks();
    }, [])

    const fetchProject = async  () => {
        try {
            const response = await axios.get(`***`)
            setProject(response.data)
        } catch (error) {
        console.log('Ошибка при загруке данных о проектах:', error)
    }}

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`***`)
            setTasks(response.data)
        } catch (error) {
            console.log('Ошибка при загрузке данных о задачах проекта')
        }
    }

    return (
        <Box sx={{ p: 2}}>
            <Link href='***' target="blank">
                <Button size="small" color='warning'>Поставить задачу</Button>            
            </Link>
            <Typography sx={{pt:2}} variant='h4'>Проект "{project.name}"</Typography>
            <Divider sx={{ pt:2 }}/>
            <Typography sx={{ pt:2 }}>{project.description}</Typography>
            <Divider sx={{ pt:2 }}/>
            <Typography variant='h6' sx={{ pt:2 }}>Задачи:</Typography>
            <TaskList projectId={project.id} tasks={tasks}/>
        </Box>
    );
}