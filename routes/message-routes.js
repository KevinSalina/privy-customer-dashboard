const express = require('express')
const router = express.Router()
const { getMessages, saveMessage, sendMessage } = require('../controllers/message-controller')

router.get('/', async (req, res) => {

  try {
    const allMessages = await getMessages()
    return res.send(allMessages)
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }

});


router.post('/', async (req, res) => {
  const { message, selectedCustomers } = req.body

  if (!message) return res.status(400).json({ error: 'Please provide a message to send' })
  if (!selectedCustomers) return res.status(400).json({ error: 'No customers selected' })

  const newMessage = await saveMessage(message)
  const results = await sendMessage(newMessage, selectedCustomers)

  res.status(results.status).send(results)
})


module.exports = router;