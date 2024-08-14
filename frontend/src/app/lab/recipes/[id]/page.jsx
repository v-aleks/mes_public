'use client';

import { React, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { getStatusName } from "@/app/_utils/functions";
import { Box, Typography, Stack, Divider, Grid, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function RecipeDetail({params}) {
    const recipeId = params.id
    const [recipeComponents, setRecipeComponents] = useState([]);
    const [recipe, setRecipe] = useState({});
    const [users, setUsers] = useState({});

    useEffect(() => {
        fetchRecipeData();
        fetchComponentData();
        fetchUsers();
    }, [recipeId])

    const fetchComponentData = async () => {
        try {
            if (recipeId) {
                const response = await axios.get(`***`);
                const componentsIds = response.data.map(rc => rc.component);

                if (componentsIds.length > 0) {
                    // Запросим названия компонентов по их идентификаторам
                    const componentsPromises = componentsIds.map(componentId =>
                        axios.get(`***`)
                    );
                    const componentsResponses = await Promise.all(componentsPromises);
                    const componentsData = componentsResponses.map(response => response.data);

                    // Создадим новый массив с данными компонентов, включая их названия
                    const recipeComponentsWithData = response.data.map((rc, index) => ({
                        id: rc.id,
                        name: componentsData[index].name,
                        concentration: rc.concentration,
                        phase: rc.phase,
                    }));

                    setRecipeComponents(recipeComponentsWithData);
                } else {
                    setRecipeComponents([]); // Если компоненты отсутствуют, устанавливаем пустой массив
                }
            } else {
                setRecipeComponents([]); // Если recipeId отсутствует, устанавливаем пустой массив
            }
        } catch (error) {
            console.error('Ошибка при загрузке компонентов рецепта:', error);
        }
    };

    const fetchRecipeData = async () => {
        try {
            if (recipeId) {
                // Здесь можно загрузить дополнительные данные по recipeId, если это необходимо
                const response = await axios.get(`***`);
                const recipe = response.data;
                // Обновляем состояние рецепта
                setRecipe(recipe);
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных рецепта:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('***');
            const usersData = response.data.reduce((acc, user) => {
                acc[user.id] = {
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name
                };
                return acc;
            }, {});
            setUsers(usersData);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
    };

    const printClick = () => {
        window.print();
    };

    const responsibleUser = users[recipe.person];
    const responsibleName = responsibleUser ? `${responsibleUser.first_name} ${responsibleUser.last_name}` : recipe.person;

    const selectedDate = recipe.date;
    const formattedDate = selectedDate ? selectedDate.split('T')[0] : '';
    const formattedTime = selectedDate ? selectedDate.split('+')[0].split('T')[1] : '';


    return (
        <Box sx={{pt:2}}>
            <Box sx={{
                pb:2,
                '@media print': {
                        display: 'none'
                }
            }}>
                <Stack direction='row' spacing={4}>
                    <Link href={`/lab/tasks/${recipe.task}/`}>
                        <Button size="small" color='warning'>Назад к задаче</Button>
                    </Link>
                    <Link href={`***`} target="blank">
                        <Button size="small" color='warning'>Изменить рецептуру</Button>
                    </Link>
                    <Button size="small" color='info' onClick={printClick}>Печать</Button>
                </Stack>
            </Box>
            <Stack direction='row' spacing={10}>
                <Typography>Название образца: <strong>{recipe.name}</strong></Typography>
                <Typography>Дата сборки: <strong>{formattedDate} - {formattedTime}</strong></Typography>
                <Typography sx={{'@media print': {display: 'none'}}}>Статус: <strong>{getStatusName(recipe.status)}</strong></Typography>
            </Stack>
            <Divider sx={{pt: 2}}/>
            <Grid sx={{pt: 2}} container spacing={4}>
                <Grid item xs={6}>
                    <Typography>Рецептура:</Typography>
                        <Table sx={{pt: 2}} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong><i>Название компонента</i></strong></TableCell>
                                    <TableCell><strong><i>Фаза</i></strong></TableCell>
                                    <TableCell><strong><i>Масса, гр</i></strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recipeComponents.length > 0 ? (
                                    recipeComponents.map(rc => (
                                        <TableRow 
                                            key={rc.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{rc.name}</TableCell>
                                            <TableCell>{rc.phase}</TableCell>
                                            <TableCell>{rc.concentration}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell>Загрузка...</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Методика:</Typography>
                    <Typography sx={{pt: 2}} variant="body2">
                        {recipe.technology}
                    </Typography>
                </Grid>
            </Grid>
            <Typography sx={{pt:4}}>Лабораторные параметры:</Typography>
            <Table sx={{pt: 4}} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><strong><i>Параметр</i></strong></TableCell>
                        <TableCell sx={{display:'none'}}><strong><i>Значение параметра</i></strong></TableCell>
                        <TableCell sx={{'@media print': {display: 'none'}}}><strong><i>Фактическое значение</i></strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>рН</TableCell>
                        <TableCell sx={{display:'none'}}></TableCell>
                        <TableCell sx={{'@media print': {display: 'none'}}}>{recipe.ph}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Динамическая вязкость</TableCell>
                        <TableCell sx={{display:'none'}}></TableCell>
                        <TableCell sx={{'@media print': {display: 'none'}}}>{recipe.viscosity}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Коллоидная стабильность</TableCell>
                        <TableCell sx={{display:'none'}}></TableCell>
                        <TableCell sx={{'@media print': {display: 'none'}}}>{recipe.stability == true ? 'Стабильно':'Не стабильно'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Typography sx={{pt:6}}>{recipe.comment}</Typography>
            <Divider sx={{pt:4}}/>
            <Typography sx={{pt:6, '@media print': {display: 'none'}}}>Ответственный: {responsibleName}</Typography>
            <Typography sx={{pt:6, display:'none', '@media print': {display: 'block'}}}>Ответственный (ФИО/Подпись):</Typography>
        </Box>
    );
}

export default RecipeDetail;