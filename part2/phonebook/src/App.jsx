import { useState, useEffect } from 'react'
import personsService from './services/persons'

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'

function App() {
  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  */ 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState('alert')

  const hook = () => {
    /*
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data)
      })
    */
    personsService
      .getAll()
      .then(response => setPersons(response))
  }

  useEffect(hook, [])

  const toggleDelete = (id) => { 
    const personDelete = persons.find(person=>person.id === id)
    if (window.confirm(`Delete ${personDelete.name}?`)) {
      personsService
        .deletePerson(id)
        .then(response=>{
          setPersons(persons.filter(person=>person.id !== personDelete.id))
        })
    }
  }

  const handleNewNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const filter = () => {
    return filterName !== '' ? persons.filter(person=>includeFilter(person.name, filterName)) : persons
  }

  const includeFilter = (str, substr) => str.toLowerCase().includes(substr.toLowerCase())

  const hasPerson = (person) => persons.some(item => item.name === person)

  const clearCtrols = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPhoneNumber = (event) => {
    event.preventDefault();

    if(hasPerson(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        //PUT
        const personUpdate = persons.find(person=>person.name === newName)
        personUpdate.number = newNumber
        personsService
          .update(personUpdate.id, personUpdate)
          .then(response=> {
            setPersons(persons.filter(person=>person.id !== response.id).concat(response))
            setAlertType('alert success')
            showMessage(`Edited phone number for ${newName}`)
          })
          .catch(err=>{
            setAlertType('alert error')
            showMessage(`Information of ${personUpdate.name} has already been removed from server`)
            setPersons(persons.filter(person=>person.id !== personUpdate.id))
          })
          .finally(()=>{
            clearCtrols()
          })
      }
    } else {
      //NEW
      const book = persons;
      //book.push({name:newName, number:newNumber})
      personsService
        .create({name:newName, number:newNumber})
        .then(response => { 
          book.push(response)
          setPersons(book)
          clearCtrols()
          setAlertType('alert success')
          showMessage(`Added ${newName}`)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setAlertType('alert error')
          showMessage('An error occurred. See the console')
        })
    }

/*
    if (!hasPerson(newName)) {      
    } else {
      alert(`${newName} is already added to phonebook`)
    }
*/
  }

  const showMessage = (message) => {
    setAlertMessage(message)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={alertMessage} 
        className={alertType}
      />
      <PersonForm
        submit={addPhoneNumber}
        mameValue={newName}
        nameHandleChange={handleNewNameChange}
        numberValue={newNumber}
        numberHandleChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Filter 
        value={filterName}
        handleChange={handleFilterNameChange}
      />
      <Persons 
        persons={filter()}
        toggleDelete={toggleDelete}
      />      
    </div>
  )
}

export default App
