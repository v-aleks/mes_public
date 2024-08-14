'use client'

import axios from "axios";
import Link from "next/link";
import { React, useState, useEffect } from "react"
import { Box, Stack, Button, Typography, Divider } from "@mui/material";
import dayjs from "dayjs";


export default function FeedbackList () {
    
    const FEEDBACK_API_URL = '***'
    const [feedbackData, setFeedbackData] = useState([])

    useEffect(() => {
        fetchFeedbackData();
    }, [])

    async function fetchFeedbackData() {
        try {
            const response = await axios.get(FEEDBACK_API_URL)
            setFeedbackData(response.data)
        } catch (error) {'Ошибка при получении данных обратной связи:', error}
    }

    console.log(feedbackData)

    return (
        <Box>
            <Typography variant="h6">Лист запросов</Typography>
            <Divider sx={{my:2}} />
            <Stack direction='column' spacing={2}>
                {feedbackData ? (feedbackData.map(entry => (
                    <Link href={`/lab/polls/feedbacks/${entry.id}/`}>
                        <Button size='small' color="warning" key={entry.id}>
                            {entry.status} / {entry.project.name} - {entry.recipe.name} / {dayjs(entry.date_created).format('DD.MM.YYYY')} - {dayjs(entry.date_answered).format('DD.MM.YYYY')}
                        </Button>   
                    </Link>
                ))) : (
                    <p>Загрузка...</p>
                )}
                
            </Stack>
        </Box>
    )
}