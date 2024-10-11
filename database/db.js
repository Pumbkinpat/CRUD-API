const mongoose = require('mongoose');

const connectToDb = async () => {
	await mongoose.connect(process.env.URI).then(() => {
		console.log('MONGOOSE CONNECTED SUCCESSFULLY');
	});
};

module.exports = connectToDb;