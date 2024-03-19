const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = ({part}) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  const rows = [];
  parts.forEach((part)=>{
    rows.push(
      <Part 
        part={part}
        key={part.name}
      />
    );
  });

  return (
    <>
      {rows}
    </>
  )
}

const Total = ({parts}) => {
  let total = 0
  parts.forEach((i) => {
    total += i.exercises;
  });

  return (
    <>
      <p>
        Number of exercises {total}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of the component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header 
        course={course.name} 
      />
      <Content
        parts={course.parts}  
      />
      <Total
        parts={course.parts}
      />
    </>
  )
}

export default App
