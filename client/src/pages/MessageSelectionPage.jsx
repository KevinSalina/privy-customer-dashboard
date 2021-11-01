import React from 'react';
import MessageSelectionTable from '../components/MessageSelectionTable/MessageSelectionTable';
import Navbar from '../components/NavBar/NavBar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom'

const MessageSelectionPage = () => {
  const data = useLocation()
  const selectedCustomers = data.state ? data.state.selectedCustomers : null

  return (
    <React.Fragment>
      <Navbar />
      <Box className="main-wrapper">
        <Box className="top-content message-selection-page">
          <Typography color='primary' variant="h2" fontWeight='bold'>
            Message
          </Typography>
          <Typography color='primary' variant="subtitle1" fontWeight='bold'>
            Select a message below or craft a new message to send.
          </Typography>
        </Box>
        <MessageSelectionTable selectedCustomers={selectedCustomers} />
      </Box>
    </React.Fragment>
  );
};

export default MessageSelectionPage;