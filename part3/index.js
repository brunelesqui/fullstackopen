//console.log('Hello') 

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const requestLogger = (request, response, next) => {
  console.log('requestLogger:')
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('dist'))

//app.use(morgan('tiny'))
//app.use(morgan(':url :method :status :res[content-length] * :response-time ms'))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :param[id]'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

morgan.token('param', function(req, res, param) {
    return req.params[param];
})

morgan.token('data', (request, response) => { 
	return JSON.stringify(request.body);
})

//const PORT = 3001

const generateId = () => {
  const newId = Math.floor(Math.random() * 10000)
  return newId
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/info', (request, response) => { 
	const peopleCount = persons.length
	const timestamp = new Date()
	response.send(`
		<h1>Phonebook API</h1>
		<br/>
		<p>Phonebook has info for ${peopleCount} people</p>
		<p>${timestamp}</p>
		`)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/', (request, response) => { 
	response.send('<h1>Phonebook API</h1>')
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if(person)
		response.json(person)
	else {
		response.statusMessage = "The current person noes not exists";
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => { 
  const id = Number(request.params.id)
  console.log(typeof id, id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  //console.log('post: request.header', request.header)

  const body = request.body

  // Si falta el nombre o el numero
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Content missing' 
    })
  }

  // El nombre de la persona ya existe
  if (persons.some(person => person.name === body.name)) {
  	return response.status(400).json({
  		error: 'The name already exists'
  	})
  }
 
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
  
  //response.send('<p>Error</p>')
})

app.use(unknownEndpoint)

/*
app.listen(PORT, () => {
	console.log(`Phonebook Server running in port ${PORT}`)
})
*/

const SERVER_NAME = 'Phonebook'
const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`${SERVER_NAME} Server running on port ${PORT}`)
})
