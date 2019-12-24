const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();

mongoose.connect(process.env.LOCAL_DB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password cannot contain "password"');
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a postive number');
			}
		}
	}
});

// const me = new User({
// 	name: 'Dani',
// 	email: 'dani@email.com',
// 	password: '12345678'
// });

// me
// 	.save()
// 	.then(() => {
// 		console.log(me);
// 	})
// 	.catch((error) => {
// 		console.log('Error!', error);
// 	});

const Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

const task = new Task({
	description: ' Buy a book'
});

task
	.save()
	.then(() => {
		console.log(task);
	})
	.catch((error) => {
		console.log('Error!', error);
	});
