const express = require('express');
const userRouter = require('./src/router/user');
const taskRouter = require('./src/router/task');
require('./src/db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
