//console.log('Hello') 
/*
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
*/

const requestLogger = (request, response, next) => {
  console.log('requestLogger:')
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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
  Person.find({}).then(persons=>response.json(persons))
})

app.get('/', (request, response) => { 
	response.send('<h1>Phonebook API</h1>')
})

app.get('/api/persons/:id', (request, response, next) => {
	/*
  const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)
	if(person)
		response.json(person)
	else {
		response.statusMessage = "The current person noes not exists";
		response.status(404).end()
	}
  */
  Person.findById(request.params.id)
    .then(person=>response.json(person))
    .catch(error=>next(error))
})

app.delete('/api/persons/:id', (request, response, next) => { 
  /*
  const id = Number(request.params.id)
  
  console.log(typeof id, id)
  persons = persons.filter(person => person.id !== id)
    
  const filter = { _id: request.params.id.toString() }
  console.log(filter)
  Person.deleteOne(filter).then((res) => { 
    //console.log('res:', res, 'deletedCount:', typeof res.deletedCount, 'acknowledged:', typeof res.acknowledged)
    if (res.acknowledged && res.deletedCount > 0)
      return response.status(204).end()
    else
      return response.status(400).json({
        error:'No deleted'})
  })
  */

  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  //console.log('post: request.header', request.header)

  const body = request.body
/*  
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
  */
 
  const person = new Person ({
    name: body.name,
    number: body.number,
    //id: generateId(),
  })

  //persons = persons.concat(person)
  //response.json(person)  
  //response.send('<p>Error</p>')

  //person.save().then(savedPerson=>response.json(savedPerson))
  person.save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  //const body = request.body
  const { name, number } = request.body
/*
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new:true})
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
*/
  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query'}
  ).then(updatedPerson => response.json(updatedPerson))
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError')
    return response.status(400).send({error:'Malformatted id'})
  if (error.name === 'SyntaxError')
    return response.status(400).send({error: 'Json syntax'})
  if (error.name === 'ValidationError')
    return response.status(400).json({error: error.message})

  next(error)
}

app.use(unknownEndpoint)

app.use(errorHandler)

/*
app.listen(PORT, () => {
	console.log(`Phonebook Server running in port ${PORT}`)
})
*/

const SERVER_NAME = process.env.SERVER_NAME
const PORT = process.env.PORT // || 3001 
app.listen(PORT, () => {
  console.log(`${SERVER_NAME} Server running on port ${PORT}`)
})
