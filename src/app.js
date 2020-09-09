require('dotenv').config()
require('./db/mongoose')

const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const homeRouter = require('./routers/home')
const contactRouter = require('./routers/contactForm')
const eventRouter = require('./routers/event')
const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const interpreterRouter = require('./routers/interpreter')
const clientRouter = require('./routers/client')

const app = express()
const PORT = process.env.PORT || 5000

var corsOptions = {
    // origin: 'https://www.indigenousinterpreters.org',
    origin: 'http://localhost:8000',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(homeRouter)
app.use(contactRouter)
app.use(eventRouter)
app.use(userRouter)
app.use(adminRouter)
app.use(interpreterRouter)
app.use(clientRouter)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')

app.use(express.static(publicDirectoryPath))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
// If no API routes are hit, send the React app
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log('Server is up on PORT', PORT)
})
