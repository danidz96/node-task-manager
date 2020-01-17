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
	const response = await request(app)
		.post('/users')
		.send({
			name: 'Dani',
			email: 'dani@email.com',
			password: '123456789'
		})
		.expect(201);

	// Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assertions about response
	expect(response.body).toMatchObject({
		user: {
			name: 'Dani',
			email: 'dani@email.com'
		},
		token: user.tokens[0].token
	});
	expect(user.password).not.toBe('123456789');
});

test('Should login existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({ email: userOne.email, password: userOne.password })
		.expect(200);

	const user = await User.findById(userOneId);
	expect(response.body.token).toBe(user.tokens[1].token);
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

test('Should not get profile for unauthenticated user', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
	await request(app).delete('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);

	const user = await User.findById(userOneId);
	expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/logo.png')
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({ name: 'Mireia' })
		.expect(200);

	const user = await User.findById(userOneId);
	expect(user.name).toEqual('Mireia');
});
