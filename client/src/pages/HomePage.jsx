import React from 'react';
import UploadCSVForm from '../components/UploadCSVForm/UploadCSVForm';
import CustomerTable from '../components/CustomerTable/CustomerTable';
import Navbar from '../components/NavBar/NavBar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const HomePage = () => {

  return (
    <React.Fragment>
      <Navbar />
      <Box className="main-wrapper">
        <Box className="top-content">
          <Typography color='primary' variant="h2" fontWeight='bold'>
            Customer Dashboard
          </Typography>
          <UploadCSVForm />
        </Box>
        <Typography mb={2} color='primary' variant="subtitle1" fontWeight='bold'>
          Select customers below to message
        </Typography>
        <CustomerTable />
      </Box>
    </React.Fragment>
  );
};

export default HomePage;