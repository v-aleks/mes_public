'use client'
import React from "react";
import signIn from "../firebase/auth/signin";
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import Link from "next/link";
import { Formik, Field, Form } from 'formik';

function Page() {
    const router = useRouter()

    const handleForm = async (values, { setSubmitting, setErrors }) => {
        const { email, password } = values;

        const { result, error } = await signIn(email, password);

        if (error) {
            setErrors({ general: error.message });
            setSubmitting(false);
            return console.log(error);
        }

        console.log(result);
        router.push("/");
    };

    return (
        <>
            <Typography variant="h5">Авторизация</Typography>
            <Box sx={{ m: 2, justifyContent: 'center' }}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleForm}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <Stack direction="column" spacing={2}>
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                <Field
                                    as={TextField}
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                {errors.general && (
                                    <Typography color="error" variant="body2">
                                        {errors.general}
                                    </Typography>
                                )}
                                <Button 
                                    color="warning" 
                                    type="submit" 
                                    variant="contained"
                                    disabled={isSubmitting}
                                >
                                    Войти
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
                <Typography variant="body2" color="text.secondary">
                    Нет аккаунта? <Link href="/signup"><Button color="warning">Зарегистрироваться</Button></Link>
                </Typography>
            </Box>
        </>
    );
}

export default Page;