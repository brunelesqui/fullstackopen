const mongoose = require('mongoose')

const URL = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(URL)
	.then(result => {
		console.log('Connected to MongoDB')
	})
	.catch(error=>{
		console.log('Error connecting to MongoDB:', error.message)
	})

/*
const schema = new mongoose.Schema({
	name: String,
	number: String,
})
*/

const schema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 5,
		required: true
	},
	number: {
		type: String,
		minLength: 7,
		required: true
	}
})

schema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', schema)