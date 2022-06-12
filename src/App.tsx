import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router';
import Registration from './Registration';
import Navbar from './components/Navbar';
import NumberList from './NumberList';
import Search from './Search';

export default function App() {
  return (
    <Container maxWidth="md" sx={{height: '100vh', border: '1px solid #f0f0f0'}}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mobile Number Validator
        </Typography>
        <Navbar />
      </Box>
      <Routes>
        <Route path='/' element={<Registration />}/>
        <Route path='/valid' element={<NumberList />}/>
        <Route path='/search' element={<Search />}/>
      </Routes>
    </Container>
  );
}
