import Person from './Person.jsx'

const Persons = ({persons, toggleDelete}) => {
	return (
		<ul>
        	{persons.map((person)=><Person key={person.id} name={person.name} number={person.number} toggleDelete={() => toggleDelete(person.id)}/>)}
      	</ul>
	)
}

export default Persons