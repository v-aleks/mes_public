import React from "react";
import { Box, Paper, Card, CardContent, CardHeader, Typography, Divider } from "@mui/material";

export default function StatsCard ({data, data_diff, name, measure}) {
    const getDiffColor = () => {
        if (data_diff < 0 & measure != '%') {return 'error.light'}
        if (data_diff > 0 & measure != '%') {return 'success.light'}
        if (data_diff > 0 & measure == '%') {return 'error.light'}
        if (data_diff < 0 & measure == '%') {return 'success.light'}
        
    }
    return (
        <Box sx={{my:0.5}}>
            <Card sx={{maxWidth:'200px', maxHeight:'150px'}}>
                <Paper elevation={3}>
                    <CardHeader subheader={name} />
                    <Divider/>
                    <CardContent>
                        <Typography variant="h5">{data} {measure}</Typography>
                        <Typography color={getDiffColor} variant="subtitle1">{data_diff}</Typography>
                    </CardContent>
                </Paper>
            </Card>
        </Box>
    );
}