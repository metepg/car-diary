import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Container, Box, IconButton } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Diary from './components/Diary/Diary.tsx';
import TripForm from './components/TripForm/TripForm.tsx';

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;