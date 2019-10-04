
const multer = require('multer')
const path = require('path')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const extension = path.extname(file.originalname)
      const name = path.basename(file.originalname, extension)
      console.log(`${path.extname(extension)}`, extension)
      console.log(`${name}-${Date.now()}${extension}`)
      callback(null, `${name}-${Date.now()}${extension}`)
    }
  })
}