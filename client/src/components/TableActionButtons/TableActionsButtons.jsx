import React from 'react'
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const TableActionsButtons = ({ selectedCustomers, deleteCustomers }) => {

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, }}
      mt={3}
    >
      <Button
        variant="outlined"
        disabled={selectedCustomers.length > 0 ? false : true}
        component={Link}
        to={{
          pathname: selectedCustomers.length > 0 ? '/message/selection' : '#',
          state: { selectedCustomers }
        }}
      >
        Send Message
      </Button>
      <Button
        variant="outlined"
        component={Link}
        to={{
          pathname: '/message/logs'
        }}
      >
        Message Logs
      </Button>
      <Button
        variant="outlined"
        color="error"
        disabled={selectedCustomers.length > 0 ? false : true}
        onClick={deleteCustomers}
      >
        Delete
      </Button>
    </Stack>
  )
}

export default TableActionsButtons
