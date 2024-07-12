import './App.css'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
  FormControlLabel,
  Switch
} from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Diary from './components/Diary/Diary.tsx';
import TripForm from './components/TripForm/TripForm.tsx';
import { useState } from 'react';
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
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={handleThemeChange} color="default" />}
                label="Dark Mode"
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<TripForm />} />
            <Route path="/create" element={<TripForm />} />
            <Route path="/diary" element={<Diary />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
};

export default App;