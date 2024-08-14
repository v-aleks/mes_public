'use client';

import * as React from 'react';
import ComponentTable from './_components/ComponentTable';
import { Box, Typography } from '@mui/material';

const ComponentList = () => {
    return (
        <Box>
            <Typography variant='h6'>
                Список компонентов
            </Typography>
            <ComponentTable/>
        </Box>
    );
};

export default ComponentList;