const express = require('express');
const morgan = require('morgan');
const app = express();

morgan.token('data', (req) => {
	return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :data'));

let entries = [
	{
		name: 'Arto Hellas',
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

app.get('/api/persons', (_req, res) => {
	res.json(entries);
});

app.get('/info', (_req, res) => {
	res.send(`Phonebook has info for ${entries.length} people. \n\n ${new Date()}`);
});

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	let person = entries.filter((entry) => entry.id === Number(id));
	res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id;
	entries = entries.filter((entry) => entry.id !== Number(id));
	res.status(204).json(entries);
});

app.post('/api/persons', (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).json({ error: `Name and Number both must be present.` });
	}

	let isUnique = true;
	entries.forEach((entry) => {
		if (entry.name.toLowerCase() === body.name.toLowerCase()) {
			isUnique = false;
		}
	});

	if (!isUnique) {
		return res.status(400).json({ error: `Name must be unique.` });
	}

	const newEntry = [
		{
			name: body.name,
			number: body.number,
			id: Math.floor(Math.random() * 1000),
		},
	];
	console.log('newEntry', newEntry);
	entries = entries.concat(newEntry);

	res.json(entries);
});

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
