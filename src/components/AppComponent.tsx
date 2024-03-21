import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  CssBaseline,
  Paper,
} from "@mui/material";
import { Add, Settings, Leaderboard } from '@mui/icons-material';
import { useState } from "react";
import AddComponent from "./AddComponent";
import ExportComponent from "./ExportComponent";
import HomeComponent from "./HomeComponent";

const pages = [
  {
    label: 'Home',
    path: '/',
    icon: <Leaderboard />,
    component: <HomeComponent />,
  },
  {
    label: 'Add',
    path: '/add',
    link: '/add',
    icon: <Add />,
    component: <AddComponent />,
  },
  {
    label: 'Export',
    icon: <Settings />,
    path: '/export',
    component: <ExportComponent/>,
  },
];

const AppComponent = () => {
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <BrowserRouter>
      <CssBaseline/>

      <Box component="section" sx={ { pt: 2, pb: 11, fontWeight: 300 } }>
        <Container maxWidth="sm">
          <Routes>
            <Route path='/' element={<HomeComponent />} />
            { pages.map(page => (
              <Route key={page.label} path={page.path} element={page.component} />
            ))}
          </Routes>
        </Container>
      </Box>

      <Paper sx={ { position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: 1, borderColor: 'divider' } } elevation={ 3 }>
        <BottomNavigation
          showLabels
          value={ pageIndex }
          onChange={ (event, newValue) => {
            setPageIndex(newValue);
          } }
        >
          { pages.map(page => (
            <BottomNavigationAction key={ page.label } icon={ page.icon } component={RouterLink} to={page.path} />
          )) }
        </BottomNavigation>
      </Paper>
    </BrowserRouter>
  )
}

export default AppComponent;