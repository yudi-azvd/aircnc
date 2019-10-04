const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')

const app = express()

mongoose
  .connect('mongodb+srv://omnistack:omnistack@omnistack-krme4.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.log(error)
  })

const PORT = 3333

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

app.listen(PORT, () => {
  console.log(`to ouvindo ${PORT}`)
})