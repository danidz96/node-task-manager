require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = process.env.LOCAL_DB_URL;
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) return console.log('Unable to connect to database');

	const db = client.db(databaseName);

	// db.collection('users').insertOne({
	// 	name: 'Dani',
	// 	age: 23
	// });

	// db
	// 	.collection('tasks')
	// 	.insertMany(
	// 		[
	// 			{ description: 'Buy a keyboard', completed: false },
	// 			{ description: 'Install mongodb', completed: true }
	// 		],
	// 		(error, result) => {
	// 			if (error) return console.log('Unable to insert tasks');

	// 			console.log(result.ops);
	// 		}
	// 	);

	db.collection('users').findOne({ name: 'Dani' }, (error, user) => {
		if (error) return console.log('Unable to fetch');

		console.log(user);
	});

	db.collection('users').find({ age: 23 }).toArray((error, users) => {
		if (error) return console.log('Unable to fetch');

		console.log(users);
	});

	db.collection('users').find({ age: 23 }).count((error, count) => {
		if (error) return console.log('Unable to fetch');

		console.log(count);
	});
});
