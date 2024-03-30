const mongoose = require('mongoose')

const password = process.argv[2]
const namePerson = process.argv[3]
const numberPerson = process.argv[4]

const databse = 'PhonebookDB'
const url =
  `mongodb+srv://brunocba05:${password}@clustertest.8fbqrr9.mongodb.net/${databse}?retryWrites=true&w=majority&appName=ClusterTest`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const schema = new mongoose.Schema({
  name: String,
  number: String,
})

const model = mongoose.model('Person', schema)

const create = () => {
  //Procedimiento para agregar nuevas notas:

  const person = new model({
    name: namePerson,
    number: numberPerson,
  })

  person.save().then(result => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}

const getAll = () => {
  const filter = {}

  model.find(filter).then(result => {
    result.forEach(item => {
      console.log(item)
    })
    mongoose.connection.close()
  })  
}

if (process.argv.length < 5) {
  //console.log('give password as argument')
  getAll()  
  //process.exit(1)
} else {
  create()
}

