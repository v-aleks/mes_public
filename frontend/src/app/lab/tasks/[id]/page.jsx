'use client';


import axios from "axios";
import {React, useState, useEffect} from "react";
import Link from "next/link";
import { Typography, Box, Divider, Button, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import { getStatusName } from "@/app/_utils/functions";
import { formatInTimeZone } from 'date-fns-tz'
import RecipeForm from "../_components/RecipeForm";



function TaskDetail({params}) {

    const [recipes, setRecipes] = useState([]);
    const [task, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchRecipes();
        fetchTasks();
        fetchUsers();
    }, [])

    const fetchRecipes = async () => {
        try { 
            const response = await axios.get(`***`)
            setRecipes(response.data)
        } catch (error) {console.log('Ошибка получения данных о рецептах:', error)}
    }

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`***`)
            setTasks(response.data)
        } catch (error) {
            console.log('Ошибка при загрузке данных о задачах проекта')
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get('***');
            const usersData = response.data.reduce((acc, user) => {
                acc[user.id] = user.username;
                return acc;
            }, {});
            setUsers(usersData);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
    }

    return(
        <Box sx={{ p: 2}}>
            <Stack direction='row' spacing={2} sx={{
                        '@media print': {
                            display: 'none'
                        }
                            }}>
                <Link href={`/lab/projects/${task.project}/`}>
                    <Button size="small" color="warning">Назад к проекту</Button>
                </Link>
                <Link href={`***`} target="blank">
                    <Button size="small" color="warning">Добавить рецептуру</Button>
                </Link>
                <Link href={`***`} target="blank">
                    <Button size="small" color="warning">Изменить задачу</Button>
                </Link>
                <RecipeForm/>

            </Stack>
            <Typography sx={{ pt: 2}} variant='h4'>Задача "{task.name}"</Typography>
            <Divider sx={{ pt:2 }}/>
            <Typography sx={{ pt:2 }}>{task.description}</Typography>
            <Divider sx={{ pt:2 }}/>
            <Typography variant='h6' sx={{ pt:2 }}>Рецептуры:</Typography>
            <List>
                {recipes ? (recipes.map(recipe => (
                    <ListItem>
                        <Link href={`/lab/recipes/${recipe.id}`}>
                            <ListItemButton>
                                <ListItemText>{getStatusName(recipe.status)} / {recipe.name} - {formatInTimeZone(new Date(recipe.date), 'Europe/Moscow', 'dd.MM.yyyy HH:mm')} / {users[recipe.person] || recipe.person}</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))) : (
                    <ListItem>Загрузка...</ListItem>
                )}
                <ListItem>

                </ListItem>
            </List>
        </Box>
    );
}

export default TaskDetail;