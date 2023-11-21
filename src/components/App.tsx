import React, { useState } from 'react';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Toolbar,
} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Home, Groups, Toc } from '@mui/icons-material';
import HomePage from "./HomePage";
import PlayersPage from "./PlayersPage";
import GamesPage from "./GamesPage";
import ThemeSwitch from "./ThemeSwitch";
import { Theme } from "../util/types";

const pages = [
  {
    label: 'Home',
    icon: <Home/>,
    component: <HomePage/>,
  },
  {
    label: 'Players',
    icon: <Groups/>,
    component: <PlayersPage/>,
  },
  {
    label: 'Games',
    icon: <Toc/>,
    component: <GamesPage/>,
  },
];


function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>('dark');

  const palette = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={ palette }>
      <CssBaseline/>
      <AppBar position="static" sx={ { py: 1, fontSize: 24 } }>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            { pages[pageIndex].label }
          </Typography>

          <ThemeSwitch theme={theme} setTheme={setTheme} />
        </Toolbar>
      </AppBar>

      <Box component="section" sx={ { pt: 2, pb: 11, fontWeight: 300 } }>
        <Container maxWidth="sm">
          { pages[pageIndex].component }
        </Container>
      </Box>

      <Paper sx={ { position: 'fixed', bottom: 0, left: 0, right: 0 } } elevation={ 3 }>
        <BottomNavigation
          showLabels
          value={ pageIndex }
          onChange={ (event, newValue) => {
            setPageIndex(newValue);
          } }
        >
          { pages.map(page => (
            <BottomNavigationAction key={ page.label } label={ page.label } icon={ page.icon }/>
          )) }
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
