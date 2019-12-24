const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.LOCAL_DB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const User = mongoose.model('User', {
	name: {
		type: String
	},
	age: {
		type: Number
	}
});

const me = new User({
	name: 'Dani',
	age: 23
});

me
	.save()
	.then(() => {
		console.log(me);
	})
	.catch((error) => {
		console.log('Error!', error);
	});
