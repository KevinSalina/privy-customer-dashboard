const express = require('express')
const router = express.Router()
const { uploadCSV } = require('../controllers/csv-controller.js')
const uploads3 = require('../utilities/upload-aws')

// Upload CSV To AWS S3 and Parse - then save to DB
router.post('/upload', async (req, res) => {
  uploads3.single('file')(req, res, async (err) => {
    if (err) return res.status(404).json({ error: err })
    if (req.file == undefined) return res.status(400).json({ error: "Please upload a CSV file!" })

    const fileName = req.file.key

    const uploadCSVResults = await uploadCSV(fileName)

    if (uploadCSVResults.errors) return res.status(400).json(uploadCSVResults.errors)

    return res.status(uploadCSVResults.status).json({ success: uploadCSVResults.message })
  })
})

module.exports = router;