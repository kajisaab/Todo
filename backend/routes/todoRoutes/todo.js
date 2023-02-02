const express = require('express');
const TodoController = require('../../controllers/todoController/todo');
const { checkToken } = require('../../utils/validate_token');
const router = express.Router();

router.post('/create-todo', checkToken, TodoController.createTodo);
router.get('/getAllTodoTask/:email', checkToken, TodoController.getAllTodoTask);
module.exports = router;
