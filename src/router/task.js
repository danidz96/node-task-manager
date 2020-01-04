const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

// GET /tasks?completed=true&limit=3&skip=2
router.get('/tasks', auth, async (req, res) => {
	try {
		// const tasks = await Task.find({ owner: req.user._id });
		// res.send(tasks);

		let match = {};

		if (req.query.completed) {
			match.completed = req.query.completed === 'true';
		}

		await req.user
			.populate({
				path: 'tasks',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip)
				}
			})
			.execPopulate();
		res.send(req.user.tasks);
	} catch (error) {
		res.status(500).send();
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send();
	}
});

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'description', 'completed' ];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates' });

	try {
		const task = await Task.findOneAndUpdate({ _id, owner: req.user._id }, req.body, {
			new: true,
			runValidators: true
		});

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
