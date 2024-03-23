const Person = ({name, number, toggleDelete}) => {
	return (
		<li>
			{name} {number} <button onClick={toggleDelete}>Delete</button>
		</li>
	)
}

export default Person