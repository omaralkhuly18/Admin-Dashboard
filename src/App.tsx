import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import { getDesignTokens } from './theme';
import  './App.css';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


export default function MiniDrawer() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [mode, setMode] = React.useState(
    Boolean(localStorage.getItem("currentModal")) ?
    localStorage.getItem("currentModal") : "light"
  );
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography sx={{ marginBottom: 2 }}>
            Omar Ramadan
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}