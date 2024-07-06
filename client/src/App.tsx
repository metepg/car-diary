import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, CssBaseline, Container, Box, IconButton } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Page3Icon from '@mui/icons-material/Assignment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddEvent from './components/AddEvent/AddEvent.tsx';
import KilometerForm from './components/KilometerForm/KilometerForm.tsx';

const Page3 = () => <Typography variant="h4">Page 3</Typography>;

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" justifyContent="center" width="100%" sx={{ gap: 4 }}>
            <IconButton color="inherit" component={Link} to="/page1">
              <DirectionsCarIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/page2">
              <ImportContactsIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} to="/page3">
              <Page3Icon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<KilometerForm />} />
          <Route path="/page1" element={<KilometerForm />} />
          <Route path="/page2" element={<AddEvent />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;