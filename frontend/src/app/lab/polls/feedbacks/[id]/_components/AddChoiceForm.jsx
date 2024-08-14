import React from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Button, TextField, Box, Stack } from "@mui/material";

export default function AddChoiceForm({ question, addChoiceToList }) {
    const API_URL = `***`;

    return (
        <Box>
            <Stack direction="column" spacing={2}>
                <Formik
                    initialValues={{ text: "", question: question.id }}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const response = await axios.post(API_URL, values);
                            addChoiceToList(response.data); // Добавляем новый ответ в список
                            resetForm(); // Сбрасываем форму после успешного добавления
                        } catch (error) {
                            console.error("CHOICE:", error);
                        }
                    }}
                >
                    <Form>
                        <Stack direction="row" spacing={2}>
                            <Field
                                as={TextField}
                                name="text"
                                label="Добавьте ответ"
                                variant="outlined"
                                fullWidth
                            />
                            <Button type="submit" variant="contained">
                                Добавить
                            </Button>
                        </Stack>
                    </Form>
                </Formik>
            </Stack>
        </Box>
    );
}
