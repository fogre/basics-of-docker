const express = require('express');
const redis = require('../redis');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  try {
    const todos = await Todo.find({})
    res.send(todos);
  } catch(e) {
    console.log(e)
  }  
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  const addedTodos = await redis.getAsync('added_todos');
  if (!addedTodos) {
    const todosInDB = await Todo.find({});
    await redis.setAsync('added_todos', todosInDB.length);
  } else {
    await redis.setAsync('added_todos', parseInt(addedTodos)+1);
  }  

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, {
      text: req.body.text || req.todo.text,
      done: req.body.done || req.todo.done
    })
    res.send(updatedTodo);
  } catch (e) {
    return res.status(400).send(e)
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
