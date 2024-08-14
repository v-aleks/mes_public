'use client';

import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Grid, Stack, Button, Container } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import dayjs from "dayjs";

export default function LabPolls() {
    const [pending, setPending] = useState([])
    const [recieved, setRecieved] = useState([])
    const PENDING_ENDPOINT = '***'
    const RECIEVED_ENDPOINT = '***'

    useEffect(() => {
        fetchPending();
        fetchRecieved();
    }, [])

    async function fetchPending () {
        try {
            const response = await axios.get(PENDING_ENDPOINT)
            setPending(response.data)
        } catch (error) {'PENDING fetch:', error}
    }

    async function fetchRecieved () {
        try {
            const response = await axios.get(RECIEVED_ENDPOINT)
            setRecieved(response.data)
        } catch (error) {'RECIEVED fetch:', error}
    }


    return(
        <Box sx={{my:0.5}}>
            <Typography variant="h5">Обратная связь</Typography>
            <Stack direction='row' spacing={2} sx={{mt:2}}>
                <Link href='/lab/polls/feedbacks/'>
                    <Button size="small" color="warning">Лист запросов</Button>
                </Link>
                <Link href='***'>
                    <Button color="warning" size="small">Создать запрос</Button>
                </Link>
            </Stack>
            <Divider sx={{my:2}} />
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Container>
                        Отправлено
                        <Stack sx={{m:2}}>
                            {pending ? (pending.map(entry => (
                                <Link key={entry.id} href={`/lab/polls/feedbacks/${entry.id}/`}>                           
                                    <Button color="warning">{entry.project.name} / {entry.recipe.name} - {dayjs(entry.date_created).format('DD.MM.YYYY')} / {entry.initial_author.first_name} {entry.initial_author.last_name}</Button>
                                </Link>
                            ))) : (
                                <p>Загрузка...</p>
                            )}
                        </Stack>
                    </Container>
                </Grid>
                <Grid item xs={6}>
                    <Container>
                        Получено
                        <Stack sx={{m:2}}>
                            {recieved ? (recieved.map(entry => (
                                <Link href={`/lab/polls/feedbacks/${entry.id}/`}>
                                    <Button color="warning">{entry.project.name} / {entry.recipe.name} - {dayjs(entry.date_answered).format('DD.MM.YYYY')} / {entry.responsible_person.first_name} {entry.responsible_person.last_name}</Button>
                                </Link>
                            ))) : (
                                <p>Загрузка...</p>
                            )}
                        </Stack>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
}