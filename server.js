const express = require('express')
const app = express()
const cors = require('cors')
global.__basedir = __dirname
const path = require('path')
const db = require('./config/database')
const models = require('./models')

require('dotenv').config()

// Require Routes
const customerRoutes = require('./routes/customer-routes')
const csvRoutes = require('./routes/csv-routes')
const messageRoutes = require('./routes/message-routes')

// App Config
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Tell Express to serve react build folder
app.use(express.static('client/build'))

// DB Test
db.authenticate()
  .then(() => console.log('connected'))
  .catch((err) => console.log('error!'))

// Reset Customer Table
db.sync().then(() => {
  console.log('Database Synced');
});

// Routes
app.use('/api/csv', csvRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/message', messageRoutes)
app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client/public', 'index.html')))


// Port
const port = process.env.PORT || 1337
app.listen(port, () => {
  console.log(`Running at localhost: ${port}`)
})