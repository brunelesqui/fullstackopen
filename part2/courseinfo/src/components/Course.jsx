import Header from './Header.jsx'
import Content from './Content.jsx'

const Course = (course) => { 
	return (
		<>
			<Header 
				title={course.course.name}
			/>
			<Content
				parts={course.course.parts}
			/>
		</>
	)
}

export default Course