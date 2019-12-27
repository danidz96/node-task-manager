const express = require('express');
require('./src/db/mongoose');
const User = require('./src/models/user');
const Task = require('./src/models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/users/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findById(id);
		res.send(user);
	} catch (error) {
		res.status(404).send();
	}
});

app.post('/users', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(404).send();
	}
});

app.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (error) {
		res.status(500).send();
	}
});

app.get('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const task = await Task.findById(id);
		res.send(task);
	} catch (error) {
		res.status(404).send();
	}
});

app.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
