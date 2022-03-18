const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(r => console.log('Connected to ' + MONGO_URL))
  .catch(e => console.log(e))
}  


module.exports = {
  Todo
}