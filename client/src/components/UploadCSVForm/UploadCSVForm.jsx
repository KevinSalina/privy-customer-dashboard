import React, { useState } from "react";
import axios from "axios";
import { Button, Box } from '@mui/material'
import Toast from '../Toast/Toast'
import './uploadcsvform.css'


const UploadCSVForm = () => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [fileNameDisplay, setFileNameDisplay] = useState('No CSV File Selected')
  const [tstMsg, setTstMsg] = useState('')

  const uploadFile = e => {
    console.log(e.target.files[0])
    if (!e.target.files[0]) return
    setFileNameDisplay(e.target.files[0].name)
    setSelectedFile(e.target.files[0])
  }

  const sendFile = () => {
    setTstMsg('')
    const data = new FormData()
    data.append('file', selectedFile)
    axios.post('/api/csv/upload', data)
      .then(res => {
        window.location.reload(false)
      })
      .catch(err => {
        setTstMsg(err.response.data.error)
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
        <Box className='form-filename' sx={{ typography: 'subtitle2', minWidth: "100px" }}>{fileNameDisplay}</Box>

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
      {tstMsg.length > 0 ? <Toast message={tstMsg} isOpen={tstMsg.length > 0} /> : null}
    </React.Fragment>


  )
}


export default UploadCSVForm;