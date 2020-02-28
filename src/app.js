require('dotenv').config()
require('./db/mongoose')

const path = require('path')
const express = require('express')
// const chalk = require('chalk')
const cors = require('cors')

const homeRouter = require('./routers/home')
const userRouter = require('./routers/user')
const contactRouter = require('./routers/contactForm')
const iProfileRouter = require('./routers/interpreterProfile')
const adminRouter = require('./routers/admin')

const app = express()
const PORT = process.env.PORT || 5000

var corsOptions = {
    origin: 'localhost:5000', // change to actual url later
    credentials: true,
    origin: true,
}

app.use(cors(corsOptions))
app.options('*', cors())
app.use(express.json())
app.use(homeRouter)
app.use(userRouter)
app.use(contactRouter)
app.use(iProfileRouter)
app.use(adminRouter)

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')

app.use(express.static(publicDirectoryPath))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
// If no API routes are hit, send the React app
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(PORT, () => {
    // console.log(chalk.cyanBright('Server is up on PORT', PORT))
    console.log('Server is up on PORT', PORT)
})
