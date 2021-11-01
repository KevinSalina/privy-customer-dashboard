import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import Toast from "../Toast/Toast";

const MessageTable = () => {
  const [messages, setMessages] = useState([])
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [tstMsg, setTstMsg] = useState('')

  useEffect(() => {
    setOpen(false)
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const fetch = await axios.get(`/api/message`)
    setMessages(fetch.data)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(4n+1)': {
      backgroundColor: theme.palette.accent.main,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const Row = (props) => {
    const { row } = props
    const [open, setOpen] = useState(false)

    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell align="center" component="th" scope="row">{row.id}</StyledTableCell>
          <StyledTableCell >{row.text}</StyledTableCell>
          <StyledTableCell align="center">{row.createdAt.substring(0, 10)}</StyledTableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 5 }}>
                {/* <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography> */}
                <Table size="small" aria-label="customers">
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Id</TableCell>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Sent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.customers.map(customer => {
                      const { id, firstName, lastName, customerMessage: { dateSent } } = customer
                      return (
                        <TableRow key={id}>
                          <TableCell component="th" scope="row">{id}</TableCell>
                          <TableCell>{`${firstName} ${lastName}`}</TableCell>
                          <TableCell>{dateSent}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  // Render Table Component
  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ height: '70vh' }}>
        <Table stickyHeader size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell width='5%' />
              <StyledTableCell width='15%' align="center">Message Id</StyledTableCell>
              <StyledTableCell width='40%' >Message</StyledTableCell>
              <StyledTableCell width='20%' sx={{ minWidth: '150px' }} align="center">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map(row => {
              return (
                <Row key={row.id} row={row} />
              )
            })}
          </TableBody>
        </Table >
      </TableContainer >
      {open ? <Toast message={tstMsg} isOpen={open} /> : null}
    </React.Fragment>
  )
}

export default MessageTable