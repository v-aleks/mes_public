'use client'

import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Divider, CircularProgress } from "@mui/material";
import ChoiceList from "./_components/ChoiceList";
import axios from "axios";
import dayjs from "dayjs";
import AddChoiceForm from "./_components/AddChoiceForm";

export default function FeedbackDetail({ params }) {
    const [questions, setQuestions] = useState([]);
    const [feedback, setFeedback] = useState(null);

    const API_URL = `***`;
    const FEEDBACK_ENDPOINT = `***`;

    useEffect(() => {
        fetchQuestions();
        fetchFeedback();
    }, []);

    async function fetchQuestions() {
        try {
            const response = await axios.get(API_URL);
            setQuestions(response.data);
        } catch (error) {
            console.error('QUESTIONS:', error);
        }
    }

    async function fetchFeedback() {
        try {
            const response = await axios.get(FEEDBACK_ENDPOINT);
            setFeedback(response.data);
        } catch (error) {
            console.error('FEEDBACK:', error);
        }
    }

    console.log(feedback)
    console.log(questions)


    return (
        <Box sx={{ my: 1 }}>
            {feedback ? (
                <Box>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="h6">
                            {feedback.project && feedback.project.name} - {dayjs(feedback.date_created).format('DD.MM.YYYY')}
                        </Typography>
                        <Typography variant="h6">Статус: {feedback.status}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Typography>Автор: {feedback.initial_author.username}</Typography>
                        <Typography>Ответственный: {feedback.responsible_person.username}</Typography>
                        <Typography>Рецептура: {feedback.recipe.name}</Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                </Box>
            ) : (
                <CircularProgress />
            )}
            {questions.length > 0 ? (
                questions.map(question => (
                    <Box key={question.id}>
                        <strong>Вопрос: {question.text}</strong>
                        <ChoiceList question={question} />
                    </Box>
                ))
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
}
