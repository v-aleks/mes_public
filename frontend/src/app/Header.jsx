import { React, useEffect } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuthContext } from './context/AuthContext';
import { Stack } from '@mui/material';
import { useRouter } from "next/navigation";
import LogoutButton from './_components/LogoutButton';


function Header() {
  const { user } = useAuthContext()
  const router = useRouter()  

  return (
    <AppBar position='fixed' sx={{ 
      zIndex: (theme) => theme.zIndex.drawer + 1,
      '@media print': {
        display: 'none'
      }
      }}>
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user ? (
            <Link href='/'>
              IC CRM
            </Link>
          ) : (
            'IC CRM'
          )          
          }
        </Typography>
          {user ? (
            <Stack direction={'row'} spacing={2}>
              <Typography>
                {user.email.split('@')[0]}
              </Typography>
              <LogoutButton/>
            </Stack>) : <Link href='/signin'>Войти</Link>}
          
        </Toolbar>
    </AppBar>
  );
}
export default Header;