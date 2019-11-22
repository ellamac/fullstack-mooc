import React from 'react';
import Part from '../components/Part';

const Content = ({ parts }) => {
  const partsComps = () =>
    parts.map(part => <Part key={part.id} part={part} />);

  return <div>{partsComps()}</div>;
};

export default Content;
