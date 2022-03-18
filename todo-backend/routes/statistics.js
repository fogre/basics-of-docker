const express = require('express');
const redis = require('../redis');
const router = express.Router();

router.get('/', async (req, res) => {
  let addedTodos = await redis.getAsync('added_todos');
  if (!addedTodos) addedTodos = 0;
  res.send({ addedTodos });
});

module.exports = router