import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//otsikko-komponentti
const Header = ({ text }) => <h1>{text}</h1>;

//Komponentti nappuloille
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

//komponentti tuloksille
const Statistic = ({ stat, result, text }) => (
  <tr>
    <td>{stat}</td>
    <td>
      {result} {text}
    </td>
  </tr>
);

const Table = ({ good, neutral, bad, all }) => {
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return (
    <table>
      <tbody>
        <Statistic stat='good' result={good} />
        <Statistic stat='neutral' result={neutral} />
        <Statistic stat='bad' result={bad} />
        <Statistic stat='all' result={all} />
        <Statistic stat='average' result={average} />
        <Statistic stat='positive' result={positive} text='%' />
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  if (all !== 0) {
    return (
      <div>
        <Header text='statistic' />
        <Table good={good} neutral={neutral} bad={bad} all={all} />
      </div>
    );
  }
  return (
    <div>
      <Header text='statistic' />
      <p>No feedback given</p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
