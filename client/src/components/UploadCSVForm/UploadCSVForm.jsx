import React, { useState } from "react";
import axios from "axios";
import { Button, Box } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './uploadcsvform.css'


const UploadCSVForm = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileNameDisplay, setFileNameDisplay] = useState('Upload CSV File')
  const [open, setOpen] = useState(false)
  const [errorMssg, setErrorMsg] = useState('')

  const uploadFile = e => {
    console.log(e.target.files[0])
    if (!e.target.files[0]) return
    setFileNameDisplay(e.target.files[0].name)
    setSelectedFile(e.target.files[0])
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  const sendFile = () => {
    const data = new FormData()
    data.append('file', selectedFile)
    axios.post('/api/csv/upload', data)
      .then(res => {
        console.log(res.statusText)
        window.location.reload()
      })
      .catch(err => {
        console.log('CSV File upload error frontend', err.message)
        setOpen(true)
        setErrorMsg('Cannot upload File.')
      })
  }

  return (
    <React.Fragment>
      <Box className='form-wrapper'>
        <input
          style={{ display: "none" }}
          id="upload-csv-file"
          type="file"
          onChange={uploadFile}
        />
        <label htmlFor="upload-csv-file">
          <Button variant="text" color="primary" component="span" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>
            Browse
          </Button>
        </label>
        <Box className='form-filename' sx={{ typography: 'subtitle2' }}>{fileNameDisplay}</Box>

        <Button
          style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
          variant="contained"
          disableElevation
          disabled={!selectedFile}
          onClick={sendFile}
        >
          Upload
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMssg}
        action={action}
      />
    </React.Fragment>


  )
}


export default UploadCSVForm;