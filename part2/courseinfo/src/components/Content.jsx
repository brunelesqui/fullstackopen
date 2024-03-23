import Part from './Part.jsx'

const Content = (parts) => {
	const rows = []
	let initialValue = 0
	let totalExercises = parts.parts.reduce(
		(total, item)=>total + item.exercises, 
		initialValue
		)

	parts.parts.forEach((part) => {
		rows.push(
			<Part 
				part={part}
				key={part.id}
			/>
		)
	})

	return (
		<>
			<div>
				{rows}
			</div>
			<h4>
				Total of exercises: {totalExercises}
			</h4>
		</>
	)
}

export default Content