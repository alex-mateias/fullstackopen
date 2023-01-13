const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
        </div>
    )
}

const Header = ({ course }) => (<h1>{course.name}</h1>)

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />)}
            <Total parts={course.parts} />
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({ parts }) => {

    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p><b>total of {total} exercises</b></p>
    )
}

export default Course