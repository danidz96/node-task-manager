const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Mireia',
	email: 'mireia@email.com',
	password: 'pass1234',
	tokens: [ { token: jwt.sign({ _id: userOneId }, process.env.SECRET_KEY) } ]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
	_id: userTwoId,
	name: 'Dani',
	email: 'dani@gmail.com',
	password: '123456789',
	tokens: [ { token: jwt.sign({ _id: userTwoId }, process.env.SECRET_KEY) } ]
};

const setupDatabase = async () => {
	await User.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();
};

module.exports = {
	userOne,
	userOneId,
	userTwo,
	userTwoId,
	setupDatabase
};
