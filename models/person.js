const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose
	.connect(process.env.CONN_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Connected to DB');
	})
	.catch((error) => {
		console.log('Error connecting to DB:', error.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
		unique: true,
	},
	number: {
		type: String,
		minlength: 8,
		required: true,
	},
});

personSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
