import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <b>Number of exercises {sum}</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);


const Course = ({course}) => {
  const parts = course.parts;
  const allExercises = parts.reduce((index, parts) => index + parts.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total
        sum={allExercises}
      />
    </div>
  );
};

export default Course;

