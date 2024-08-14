'use client';
import { React, useState, useEffect } from 'react';
import { Box, TextField, Stack, Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import RecipeDescription from './_components/RecipeDescription';
import RecipeTable from './_components/RecipeTable';
import { Formik, Field, Form } from 'formik';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import addData from '@/app/firebase/firestore/addData';

export default function RecipeURL () {
    const [recipe, setRecipe] = useState(null);
    const [recipeDescription, setRecipeDescription] = useState(null);
    const [recipeURL, setRecipeURL] = useState(null);
    const [name, setName] = useState(null);
    const [date, setDate] = useState(dayjs());

    useEffect(() => {
        if (recipeURL) {
            fetchRecipe();
            fetchRecipeDescription();
        }
    }, [recipeURL]);

    async function fetchRecipe() {
        try {
            const response = await axios.get(`***`);
            setRecipe(response.data.recipe_data);
        } catch (error) {
            console.error('RECIPE:', error);
        }
    }

    async function fetchRecipeDescription() {
        try {
            const response = await axios.get(`***`);
            setRecipeDescription(response.data.recipe_description);
        } catch (error) {
            console.error('RECIPE_DESCRIPTION:', error);
        }
    }

    console.log(recipe);
    console.log(recipeDescription);

    return (
        <Box sx={{ pt: 2 }}>
            <Formik
                initialValues={{ url: '', name: '', date: date.format('DD.MM.YYYY') }}
                onSubmit={(values, { resetForm }) => {
                    setRecipeURL(values.url);
                    setName(values.name);
                    setDate(dayjs(values.date));
                    resetForm();
                }}
            >
                {() => (
                    <Form>
                        <Stack direction="row" 
                               spacing={2}
                               sx={{'@media print': {display: 'none'}}}>
                            <Field
                                as={TextField}
                                name="url"
                                label="URL рецепта"
                                variant="outlined"
                                fullWidth
                            />
                            <Field
                                as={TextField}
                                name='name'
                                label='Название рецепта'
                                variant='outlined'
                                fullWidth
                            />
                            <Field
                                as={TextField}
                                name='date'
                                label='Дата'
                                variant='outlined'
                                type='date'
                                fullWidth
                            />
                            <Button color="warning" type="submit" variant="contained">
                                <AddIcon />
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
            <Divider sx={{ my: 2 }} />
            <Typography>Образец: {name} - {date.format('DD.MM.YYYY')}</Typography>
            <RecipeTable recipe={recipe} />
            <RecipeDescription recipeDescription={recipeDescription} />
        </Box>
    );
}
