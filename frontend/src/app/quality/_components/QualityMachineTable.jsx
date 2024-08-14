import { React } from "react";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function QualityMachineTable() {
    return (
        <Box sx={{my:1}}>
            <TableContainer>
                <Paper elevation={2}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell><i>Оборудование</i></TableCell>
                                <TableCell><i>Процент брака</i></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Тест</TableCell>
                                <TableCell>Тест</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </TableContainer>
        </Box>
    );
}