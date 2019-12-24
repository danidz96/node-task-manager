const mongoose = require('mongoose');

mongoose.connect(process.env.LOCAL_DB_URL + 'task-manager-api', { useNewUrlParser: true, useCreateIndex: true });
