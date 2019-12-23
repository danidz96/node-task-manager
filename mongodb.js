require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = process.env.LOCAL_DB_URL;
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
	if (error) return console.log('Unable to connect to database');

	const db = client.db(databaseName);

	db.collection('users').insertOne({
		name: 'Dani',
		age: 23
	});
});
