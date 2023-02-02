const {
  createTodo,
  getAllTodo,
} = require('../../db_services/todo_services/todo.service');

exports.createTodo = (req, res, next) => {
  const body = req.body;
  const title = req.body.title;

  if (!title) {
    return res.status(400).json('Title is required');
  }
  createTodo(body, async (error, result) => {
    if (error) {
      return res.status(500).json('Could not create todo task');
    }
    return res.status(201).json(`Created ${title} task successfully`);
  });
};

exports.getAllTodoTask = (req, res, next) => {
  const email = req.params.email;

  if (!email) {
    return res.status(500).json('email is needed');
  }

  getAllTodo(email, async (error, results) => {
    if (error) {
      return res.status(500).json('SQL Error');
    }
    return res.status(200).json(results);
  });
};
