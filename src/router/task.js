const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		res.send(tasks);
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const task = await Task.findById(id);
		res.send(task);
	} catch (error) {
		res.status(404).send();
	}
});

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/tasks/:id', async (req, res) => {
	const id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'description', 'completed' ];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' });

	try {
		const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
		res.send(task);
	} catch (error) {
		res.status(404).send(error);
	}
});

router.delete('/tasks/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const task = await Task.findByIdAndDelete(id);
		res.send(task);
	} catch (error) {
		res.status(404).send(error);
	}
});

module.exports = router;
