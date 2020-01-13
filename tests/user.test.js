const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: 'Mireia',
	email: 'mireia@email.com',
	password: 'pass1234',
	tokens: [ { token: jwt.sign({ _id: userOneId }, process.env.SECRET_KEY) } ]
};

beforeEach(async () => {
	await User.deleteMany();
	await new User(userOne).save();
});

test('Should signup a new user', async () => {
	await request(app)
		.post('/users')
		.send({
			name: 'Dani',
			email: 'dani@email.com',
			password: '123456789'
		})
		.expect(201);
});

test('Should login existing user', async () => {
	await request(app).post('/users/login').send({ email: userOne.email, password: userOne.password }).expect(200);
});

test('Should not login nonexisting user', async () => {
	await request(app)
		.post('/users/login')
		.send({ email: 'nonexistingmal@email.com', password: 'fakepassword' })
		.expect(400);
});

test('Should get profile for user', async () => {
	await request(app).get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);
});
