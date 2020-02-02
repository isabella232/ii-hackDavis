const mongoose = require('mongoose')

// Not sure if this is set up correctly...
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('duojc roi')
}).catch(error => {
    console.log('dell xong roi')
})
