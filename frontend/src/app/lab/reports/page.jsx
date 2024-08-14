import React from "react";
import Link from "next/link";
import { Box, Button } from "@mui/material";

export default function LabReports () {
    return (
        <Box>
            <Link href='/lab/reports/components_period/'>
                <Button color="warning">Затраты сырья на разработку за период</Button>
            </Link>
        </Box>
    );
}