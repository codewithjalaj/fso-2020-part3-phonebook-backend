const mongoose = require('mongoose');

mongoose
	.connect(process.env.CONN_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then((result) => {
		console.log('Connected to DB');
	})
	.catch((error) => {
		console.log('Error connecting to DB:', error.message);
	});

const personSchema = new mongoose.Schema({
	name: String,
	number: Number,
});

personSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
