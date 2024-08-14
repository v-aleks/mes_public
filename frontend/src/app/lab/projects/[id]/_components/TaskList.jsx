import React from "react";
import Link from "next/link";
import { formatInTimeZone } from 'date-fns-tz'
import { Box, Card, CardHeader, CardContent, CardActions, Button, Typography, Stack, Paper, Divider } from "@mui/material";

function TaskList({ projectId, tasks }) {
    return (
        <Box>
            <Stack spacing={4} direction={'row'} sx={{pt:2}}>
            
            {tasks ? (tasks.map((task) => (
                <Card sx={{
                    maxWidth: '350px'
                }}>
                    <Link href={`/lab/tasks/${task.id}/`}>
                    <Typography color='warning.main'>
                        <CardHeader 
                            title={task.name} 
                            subheader={`${formatInTimeZone(new Date(task.start_date), 'Europe/Moscow', 'dd.MM.yyyy HH:mm')} - ${formatInTimeZone(new Date(task.end_date), 'Europe/Moscow', 'dd.MM.yyyy HH:mm')}`}
                        />
                    </Typography>
                    </Link>
                        <Divider/>
                        <CardContent>
                            <Typography variant="body1">
                                {task.description}
                            </Typography>
                            <Typography variant="body2">
                                <i>Оценка: {task.mark}</i>
                            </Typography>
                        </CardContent>
                </Card>
            ))
            ) : (
                <p>Загрузка...</p>
            )}
            </Stack>
        </Box>
    );
}

export default TaskList;