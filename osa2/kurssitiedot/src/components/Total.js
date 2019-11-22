import React from 'react';

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

export default Total;
