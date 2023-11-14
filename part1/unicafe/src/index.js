import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const all = (good + neutral + bad);
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  return (
    <div>
      <h2>Feedback Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive} %</p>
    </div>
  );
};
const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  const handleFeedback = (type) => {
    switch (type) {
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
      <h1>Unicafe Feedback App</h1>
      <div>
        <button onClick={() => handleFeedback('good')}>Good</button>
        <button onClick={() => handleFeedback('neutral')}>Neutral</button>
        <button onClick={() => handleFeedback('bad')}>Bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  );
};

ReactDOM.render(<App />, document.getElementById("root"));
