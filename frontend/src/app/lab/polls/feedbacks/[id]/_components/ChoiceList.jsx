'use client';

import { React, useEffect, useState } from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import axios from "axios";
import AddChoiceForm from "./AddChoiceForm";

export default function ChoiceList({ question }) {
    const [choices, setChoices] = useState([]);
    const API_URL = `***`;

    useEffect(() => {
        fetchChoices();
    }, []);

    async function fetchChoices() {
        try {
            const response = await axios.get(API_URL);
            setChoices(response.data);
        } catch (error) {
            console.error('CHOICES:', error);
        }
    }

    const addChoiceToList = (choice) => {
        setChoices((prevChoices) => [...prevChoices, choice]);
    };

    console.log(choices);
    return (
        <Box sx={{my:1}}>
            <Stack direction="column" spacing={2} sx={{my:1}}>
                {choices ? (
                    choices.map((choice) => (
                        <Typography key={choice.id} variant="subtitle1">
                            <i>Ответ: {choice.text}</i>
                        </Typography>
                    ))
                ) : (
                    <p>Загрузка...</p>
                )}
            </Stack>
            <AddChoiceForm question={question} addChoiceToList={addChoiceToList} />
            <Divider sx={{my:2}} />
        </Box>
    );
}
