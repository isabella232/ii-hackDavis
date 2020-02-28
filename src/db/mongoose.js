const mongoose = require('mongoose')
const chalk = require('chalk')

// Not sure if this is set up correctly...
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(result => {
    console.log(chalk.greenBright.inverse('Database connected'))
}).catch(error => {
    console.log(chalk.redBright.inverse('Failed to connect to database'))
})
