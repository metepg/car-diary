import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, AppBar, Toolbar, Box, IconButton, Switch, Container } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { SnackbarProvider } from './components/SnackBarContext/SnackBarContext.tsx';
import Diary from './components/Diary/Diary.tsx';
import CreateTrip from './components/CreateTrip/CreateTrip.tsx';
import { ModeNight, Brightness7 } from '@mui/icons-material';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const handleThemeChange = () => {
    setDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Box display="flex" justifyContent="center" width="100%" sx={{ gap: 4 }}>
                <IconButton color="inherit" component={Link} to="/create">
                  <DirectionsCarIcon />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/diary">
                  <ImportContactsIcon />
                </IconButton>
                <Switch
                  checked={darkMode}
                  onChange={handleThemeChange}
                  color="default"
                  icon={<Brightness7/>}
                  checkedIcon={<ModeNight/>}
                />
              </Box>
            </Toolbar>
          </AppBar>
          <Container>
            <Routes>
              <Route path="/" element={<CreateTrip />} />
              <Route path="/create" element={<CreateTrip />} />
              <Route path="/diary" element={<Diary />} />
            </Routes>
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
