import React from "react";
import { Grid, Box, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function WorkplaceTable({workPlace}) {
    return (
        <Box>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><i><u>Работа</u></i></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {workPlace.work_periods ? (
                            workPlace.work_periods.map((period) => {
                                // Корректируем время с учетом часового пояса
                                const startDate = new Date(period[0]);
                                const endDate = new Date(period[1]);
                                const timezoneOffset = startDate.getTimezoneOffset();
                                startDate.setMinutes(startDate.getMinutes() - timezoneOffset);
                                endDate.setMinutes(endDate.getMinutes() - timezoneOffset);

                                return (
                                    <TableRow key={period[0]}>
                                        <TableCell>
                                            {startDate.toISOString().split('.')[0].split('T')[1]} - {endDate.toISOString().split('.')[0].split('T')[1]}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <tr>
                                <td>Загрузка...</td>
                            </tr>
                        )}      
                        </TableBody>    
                    </Table>
                </Grid>
                <Grid item xs={6}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><i><u>Отдых</u></i></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {workPlace.idle_periods ? (
                            workPlace.idle_periods.map((period) => {
                                const startDate = new Date(period[0]);
                                const endDate = new Date(period[1]);
                                const timezoneOffset = startDate.getTimezoneOffset();
                                startDate.setMinutes(startDate.getMinutes() - timezoneOffset);
                                endDate.setMinutes(endDate.getMinutes() - timezoneOffset);

                                return (
                                    <TableRow key={period[0]}>
                                        <TableCell>
                                            {startDate.toISOString().split('.')[0].split('T')[1]} - 
                                            {endDate.toISOString().split('.')[0].split('T')[1]}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <tr>
                                <td>Загрузка...</td>
                            </tr>
                        )}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </Box>
    )
}