const express = require('express');
const userRouter = require('./router/user');
const taskRouter = require('./router/task');
require('./db/mongoose');

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
