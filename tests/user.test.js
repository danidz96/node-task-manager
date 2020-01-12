const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
	name: 'Mireia',
	email: 'mireia@email.com',
	password: 'pass1234'
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
