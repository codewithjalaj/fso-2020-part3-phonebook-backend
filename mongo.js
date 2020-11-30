const mongoose = require('mongoose');

const password = process.argv[2];

const uri = `mongodb+srv://jalajIsTheAdmin:${password}@cluster0-vxvp0.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(
	uri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => console.log(`Connected to Database.`)
);

const personSchema = new mongoose.Schema({
	name: String,
	number: Number,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		result.forEach((person) => console.log(person));
		mongoose.connection.close();
	});
} else if (process.argv.length === 5) {
	const name = process.argv[3];
	const number = process.argv[4];
	const person = new Person({
		name,
		number,
	});

	person.save().then((result) => {
		console.log('Person Saved!');
		mongoose.connection.close();
	});
} else {
	console.log(`
  Correct Format:
  1. node mongo.js <Password> <Name> <Email> : To save a new person
  2. node mongo.js <Password> : To view all saved persons
  `);
	mongoose.connection.close();
}
