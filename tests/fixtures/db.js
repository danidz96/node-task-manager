const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Mireia',
	email: 'mireia@email.com',
	password: 'pass1234',
	tokens: [ { token: jwt.sign({ _id: userOneId }, process.env.SECRET_KEY) } ]
};

const setupDatabase = async () => {
	await User.deleteMany();
	await new User(userOne).save();
};

module.exports = {
	userOne,
	userOneId,
	setupDatabase
};
