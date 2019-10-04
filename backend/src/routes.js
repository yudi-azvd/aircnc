const express =  require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const sessionController = require('./controllers/sessionController')
const spotController = require('./controllers/spotController')
const dashboardController = require('./controllers/dashboardController')
const bookingController = require('./controllers/bookingController')

const routes = express.Router()
const upload = multer(uploadConfig)

// routes.post('/users', sessionController.store)
routes.post('/sessions', sessionController.store)

routes.post('/spots', upload.single('thumbnail'), spotController.store)
routes.get('/spots', spotController.index)
routes.post('/spots/:spot_id/bookings', bookingController.store)

routes.get('/dashboard', dashboardController.show)

module.exports = routes