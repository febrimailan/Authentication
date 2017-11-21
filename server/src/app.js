const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// Middleware
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/api/users', require('../routes/users'))

// Start server
const port = process.env.PORT || 3000
app.listen(port)
console.log(`server listening at port ${port}`);
