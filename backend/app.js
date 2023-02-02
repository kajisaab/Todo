require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feedRoutes/feed');
const authRoutes = require('./routes/authRoutes/auth');
const todoRoutes = require('./routes/todoRoutes/todo');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/feed', cors(), feedRoutes);
app.use('/auth', cors(), authRoutes);
app.use('/todo', cors(), todoRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running on port ', process.env.APP_PORT);
});
