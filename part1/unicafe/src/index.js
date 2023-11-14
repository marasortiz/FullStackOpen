import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};


const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const all = (good + neutral + bad);
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given yet.</p>;
  }

  return (
    <table>
      <thead>Statistics</thead>
      <tbody>
          <tr><StatisticLine text="Good" value={good} /></tr>
          <tr><StatisticLine text="Neutral" value={neutral} /></tr>
          <tr><StatisticLine text="Bad" value={bad} /></tr>
          <tr><StatisticLine text="All" value={all} /></tr>
          <tr><StatisticLine text="Average" value={average} /></tr>
          <tr><StatisticLine text="Positive" value={positive} /></tr>
      </tbody>
    </table>
  );
};
const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  const handleFeedback = (text) => {
    switch (text) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  return (
    
    <div>
      <h1>Give Feedback</h1>
       <div>
        <Button  onClick={() => handleFeedback("good")} text='good' />
        <Button  onClick={() => handleFeedback("neutral")} text='neutral' />
        <Button  onClick={() => handleFeedback("bad")} text='bad' />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);