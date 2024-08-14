'use client';

import { Inter } from "next/font/google";
import * as React from 'react';
import Header from './Header';
import { Sidebar } from './Sidebar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import updateLocale from 'dayjs/plugin/updateLocale'
import { Typography } from "@mui/material";
import { AuthContextProvider, useAuthContext } from "./context/AuthContext";
import signIn from "../app/firebase/auth/signin";
import { useRouter } from "next/navigation";


dayjs.locale('ru')
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
    weekStart: 1,
})


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props) {
  const [darkTheme, setDarkTheme] = React.useState(null);
  const { user } = useAuthContext()
  const router = useRouter()
  

  React.useEffect(() => {
    const theme = createTheme({
      typography: {
        fontFamily: '-apple-system',
      },
      palette: {
        mode: 'dark',
        primary: {
          main: '#12284a'
        }
      },
    });
    setDarkTheme(theme);
  }, []);

  React.useEffect(() => {
    if (user == null) router.push("/signin")
  }, [user])


  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <AuthContextProvider>
        <ThemeProvider theme={darkTheme || createTheme()}>
          <title>IC CRM</title>
          <body className={inter.className}>
                <Header/>
                <Sidebar/>
                  <Box
                  pt={9}
                  pr={2}
                  pl={2}
                  pb={2}
                  sx={{
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                      flexGrow: 1,
                      ml: '240px',
                      '@media print': {
                        ml: 0,
                        p: '8px',
                        fontSize: 8
                      }
                  }}
                  >
                    <Typography>
                      {props.children}
                    </Typography>    
                  </Box>
          </body>
        </ThemeProvider>
        </AuthContextProvider>
      </AppRouterCacheProvider>
    </html>
  );
}