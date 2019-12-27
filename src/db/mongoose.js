const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.LOCAL_DB_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});
