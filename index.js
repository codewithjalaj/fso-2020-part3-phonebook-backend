require('dotenv').config();
const Person = require('./models/phonebook');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token('data', (req) => {
	return JSON.stringify(req.body);
});

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :data'));

let entries = [
	{
		name: 'Artolla Hellas',
		number: '12-45-43434',
		id: 1,
	},
	{
		name: 'Ada Lovelace',
		number: '32-45-124542',
		id: 2,
	},
	{
		name: 'Dan Abramov',
		number: '12-43-234345',
		id: 3,
	},
	{
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
		id: 4,
	},
];

app.get('/api/persons', async (_req, res) => {
	const result = await Person.find({});

	if (!result) {
		throw new Error(`Unable to fetch data from DB.`);
	}

	return res.status(200).json(result);
});

app.get('/info', (_req, res) => {
	res.send(`Phonebook has info for ${entries.length} people. \n\n ${new Date()}`);
});

app.get('/api/persons/:id', async (req, res) => {
	// const id = req.params.id;
	// let person = entries.filter((entry) => entry.id === Number(id));
	// res.json(person);
	try {
		const result = await Person.findById(req.params.id);
		if (!result) {
			return res.status(404).json({ error: 'Not Found' });
		}

		res.json(result);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: 'Invalid ID' });
	}
});

app.delete('/api/persons/:id', async (req, res) => {
	// const id = req.params.id;
	// entries = entries.filter((entry) => entry.id !== Number(id));

	try {
		const deletedPerson = await Person.findByIdAndRemove(req.params.id);

		if (!deletedPerson) {
			return res.status(404).end();
		}

		res.json(deletedPerson);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: 'Invalid ID' });
	}
});

app.post('/api/persons', async (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({ error: `Name and Number both must be present.` });
	}

	// let isUnique = true;
	// entries.forEach((entry) => {
	// 	if (entry.name.toLowerCase() === body.name.toLowerCase()) {
	// 		isUnique = false;
	// 	}
	// });

	// if (!isUnique) {
	// 	return res.status(400).json({ error: `Name must be unique.` });
	// }

	const newPerson = new Person({
		name: body.name,
		number: body.number,
	});

	const savedPerson = await newPerson.save();

	// entries = entries.concat(newEntry);

	res.json(savedPerson);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
