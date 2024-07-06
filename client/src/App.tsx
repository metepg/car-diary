import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Container, Box, IconButton } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddTrip from './components/AddTrip/AddTrip.tsx';
import KilometerForm from './components/KilometerForm/KilometerForm.tsx';

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
            <IconButton color="inherit" component={Link} to="/page2">
              <ImportContactsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<KilometerForm />} />
          <Route path="/create" element={<KilometerForm />} />
          <Route path="/diary" element={<AddTrip />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;