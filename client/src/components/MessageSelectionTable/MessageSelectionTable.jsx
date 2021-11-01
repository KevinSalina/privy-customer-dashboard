/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid'
import Toast from "../Toast/Toast";
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'


const MessageSelectionTable = (props) => {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [tstMsg, setTstMsg] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const fetch = await axios.get(`/api/message`)
      setMessages(cleanUpDate(fetch.data))
    } catch (err) {
      console.log(err)
      setTstMsg('Cannot fetch messages')
    }
  }

  const cleanUpDate = (msgArr) => {
    return msgArr.map(msg => {
      return {
        ...msg,
        createdAt: msg.createdAt.substring(0, 10)
      }
    })
  }

  const handleNoSelectedCustomer = async () => {
    await setTstMsg('')
    !props.selectedCustomer ? setTstMsg('No Customers Selected') : null
  }

  const updatedSelectedMsg = (selection) => {
    setSelectedMessage(messages.find(msg => msg.id === selection[0]))
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 'shrink' },
    { field: 'createdAt', headerName: 'Date Created', flex: 'shrink', minWidth: 150, type: 'date' },
    { field: 'text', headerName: 'Message', flex: 1, minWidth: 150 },
  ]

  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <div style={{ display: 'flex', height: '60vh' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={messages}
              columns={columns}
              onSelectionModelChange={updatedSelectedMsg}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, }}
          mt={3}
        >
          <Button
            variant="outlined"
            disabled={selectedMessage ? false : true}
            component={props.selectedCustomers ? Link : null}
            to={{
              pathname: selectedMessage ? '/message' : '#',
              state: { selectedMessage }
            }}
            onClick={handleNoSelectedCustomer}
          >
            Send Selected Message
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to={{
              pathname: '/message',
              state: props.selectedCustomer
            }}
          >
            Craft New Message
          </Button>
        </Stack>
        {/* Toast Notificaiotn on customer delete */}
        {tstMsg.length > 0 ? <Toast message={tstMsg} isOpen={tstMsg.length > 0} /> : null}
      </div>
    </>
  )
}

export default MessageSelectionTable
