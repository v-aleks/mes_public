import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function QualityCard () {
    return (
        <Card sx={{my:1}}>
            <CardHeader title="Параметры"/>
            <CardContent>
                <Typography variant="body1">Defect Rate: 5.5%</Typography>
                <Typography variant="body1">DPMO: 26148</Typography>
                <Typography variant="body1">Sigma: 3.6</Typography>
            </CardContent>
        </Card>
);
}