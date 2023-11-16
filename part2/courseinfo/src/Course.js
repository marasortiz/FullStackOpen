import React from "react";

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);


const Course = ({course, parts}) => {
  const allExercises = parts.reduce((index, parts) => index + parts.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total
        sum={allExercises}
      />
    </div>
  );
};

export default Course;
