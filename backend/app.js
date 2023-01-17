require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feedRoutes/feed');
const authRoutes = require('./routes/authRoutes/auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running on port ', process.env.APP_PORT);
});
