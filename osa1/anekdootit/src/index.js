import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = props => {
  const randomNumber = () => Math.floor(Math.random() * props.anecdotes.length);

  const [selected, setSelected] = useState(randomNumber());
  const [points, setPoints] = useState(
    Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0)
  );

  const vote = index => {
    const copy = [...points];
    copy[index] += 1;
    console.log(copy);
    return copy;
  };

  const mostVotes = () => points.indexOf(Math.max(...points));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <p>has {points[selected]} votes</p>
      <Button onClick={() => setPoints(vote(selected))} text='vote' />
      <Button
        onClick={() => setSelected(randomNumber())}
        text='next anecdote'
      />
      <h1>Anecdote with the most votes</h1>
      <div>{props.anecdotes[mostVotes()]}</div>
      <p>has {points[mostVotes()]} votes</p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
