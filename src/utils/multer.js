const multer = require('multer')

const imgUpload = multer({
    limits: {
        fileSize: 5000000 // 5MB limit
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload an image of extension .png,.jpg, or .jpeg.'))
        }
        callback(undefined, true)
    }
})

module.exports = {
    imgUpload,
}
