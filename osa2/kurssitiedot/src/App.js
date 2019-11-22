import React from 'react';
import Course from './components/Course';

const App = ({ courses }) => {
  const coursesComp = () =>
    courses.map((course, i) => <Course key={i} course={course} />);
  return (
    <div>
      <h1>Web decelopment curriculum</h1>
      {coursesComp()}
    </div>
  );
};

export default App;
