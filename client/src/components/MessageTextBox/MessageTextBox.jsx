/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button } from '@mui/material';
import Toast from '../Toast/Toast';

const MessageTextBox = ({ selectedCustomers }) => {
  const [messageText, setMessageText] = useState('')
  const [tstMsg, setTstMsg] = useState('')

  let history = useHistory()

  const handleChange = e => {
    setMessageText(e.target.value)
  }

  const sendMessage = () => {
    setTstMsg('')

    const data = { message: messageText, selectedCustomers }
    console.log(data)
    axios.post('/api/message', data)
      .then(res => {
        console.log(res.statusText)
        // Redirect to Message Log Page
        history.push('/message/logs', { isRedirect: true })
      })
      .catch(err => {
        console.log('Error sending text message', err)
        setTstMsg('Cannot send text. Please try again.')
      })
  }

  const handleNoSelectedCustomer = async () => {
    await setTstMsg('')
    !selectedCustomers ? setTstMsg('No Customers Selected. Please go back to home page and try again.') : null
  }

  return (
    <React.Fragment>
      <TextField
        id="filled-multiline-static"
        label="Craft Text Message Here"
        multiline
        rows={4}
        variant="outlined"
        onChange={handleChange}
        value={messageText}
        fullWidth
        sx={{ maxWidth: '500px' }}
        margin='normal'
        inputProps={{ maxLength: 160 }}
      />
      <Button
        sx={{ width: '100%', maxWidth: '500px' }}
        variant="contained"
        onClick={selectedCustomers ? sendMessage : handleNoSelectedCustomer}
        disabled={messageText.length <= 0}
      >
        Send Message
      </Button>
      {tstMsg.length > 0 ? <Toast message={tstMsg} isOpen={tstMsg.length > 0} /> : null}
    </React.Fragment >
  );
};

export default MessageTextBox;