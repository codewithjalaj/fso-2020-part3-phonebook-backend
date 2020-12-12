require('dotenv').config();

const Person = require('./models/person');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const person = require('./models/person');
const app = express();

morgan.token('data', (req) => {
	return JSON.stringify(req.body);
});

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :data'));

app.get('/api/persons', async (req, res, next) => {
	try {
		const result = await Person.find({});
		if (!result) {
			throw new Error(`Unable to fetch data from DB.`);
		}
		return res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
});

app.get('/info', async (req, res, next) => {
	try {
		const persons = await person.find({});
		res.send(`Phonebook has info for ${persons.length} people. \n\n ${new Date()}`);
	} catch (error) {
		return next(error);
	}
});

app.get('/api/persons/:id', async (req, res, next) => {
	try {
		const result = await Person.findById(req.params.id);
		if (!result) {
			return res.status(404).json({ error: 'Not Found' });
		}
		res.json(result);
	} catch (error) {
		return next(error);
	}
});

app.delete('/api/persons/:id', async (req, res, next) => {
	try {
		const deletedPerson = await Person.findByIdAndRemove(req.params.id);
		if (!deletedPerson) {
			return res.status(404).end();
		}
		res.json(deletedPerson);
	} catch (error) {
		return next(error);
	}
});

app.post('/api/persons', async (req, res, next) => {
	try {
		const body = req.body;

		if (!body.name || !body.number) {
			return res.status(400).json({ error: `Name and Number both must be present.` });
		}

		const newPerson = new Person({
			name: body.name,
			number: body.number,
		});

		const savedPerson = await newPerson.save();
		res.json(savedPerson);
	} catch (error) {
		return next(error);
	}
});

app.put('/api/persons/:id', async (req, res, next) => {
	try {
		const updatedPerson = {
			...req.body,
		};

		const result = await Person.findByIdAndUpdate(req.params.id, updatedPerson, {
			new: true,
			runValidators: true,
			context: 'query',
		});

		return res.json(result);
	} catch (error) {
		return next(error);
	}
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
