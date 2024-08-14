import * as React from 'react';
import Link from 'next/link';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Toolbar } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import SyncIcon from '@mui/icons-material/Sync';
import CategoryIcon from '@mui/icons-material/Category';
import FactoryIcon from '@mui/icons-material/Factory';
import ScienceIcon from '@mui/icons-material/Science';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ResetTvIcon from '@mui/icons-material/ResetTv';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useAuthContext } from './context/AuthContext';


export function Sidebar() {
    const drawerWidth = 240;
    const { user } = useAuthContext()

    if (!user) return null

    return (
            <Drawer
            elevation={1}
            sx = {{
                width: drawerWidth,
                boxSizing: 'border-box',
                flexShrink: 0,
                '@media print': {
                    display: 'none'
                }
            }}
            variant='permanent'
            anchor='left'>
                <Toolbar/>
                <List>
                    <ListItem>
                        <Link href='/'>
                            <ListItemButton>
                                <ListItemIcon><BarChartIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                                <ListItemText>Дэшборд</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href='/sync'>
                            <ListItemButton>
                                <ListItemIcon><SyncIcon sx={{color: 'info.main'}}/></ListItemIcon>
                                <ListItemText>Синхронизация</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <Divider/>
                    <ListItem >
                        <ListItemButton disabled>
                            <ListItemIcon><CategoryIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                            <ListItemText>Товары</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <Link href='/production'>
                            <ListItemButton>
                                <ListItemIcon><FactoryIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                                <ListItemText>Производство</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href='/lab'>
                            <ListItemButton>
                                <ListItemIcon><ScienceIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                                <ListItemText>Лаборатория</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link href='/quality'>
                            <ListItemButton>
                                <ListItemIcon><WorkspacePremiumIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                                <ListItemText>Качество</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled>
                            <ListItemIcon><ShoppingBasketIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                            <ListItemText>Снабжение</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <Link href='/telemetry'>
                            <ListItemButton>
                                <ListItemIcon><ResetTvIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                                <ListItemText>Телеметрия</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    <ListItem>
                        <ListItemButton disabled>
                            <ListItemIcon><WarehouseIcon sx={{color: 'warning.main'}}/></ListItemIcon>
                            <ListItemText>Склад</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
    );
}