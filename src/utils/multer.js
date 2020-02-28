const multer = require('multer')

const avatarUpload = multer({
    limits: {
        fileSize: 5000000 // 5MB limit
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload an image of extension .png,.jpg, or .jpeg.'))
        }
        callback(undefined, true)
    }
})

const certUpload = multer({
    limits: {
        fileSize: 5000000 // 5MB limit
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(pdf)$/)) {
            return cb(new Error('Please upload a file of extension .pdf'))
        }
        callback(undefined, true)
    }
})

module.exports = {
    avatarUpload,
    certUpload
}
