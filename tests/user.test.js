const request = require('supertest');
const app = require('../src/app');

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
