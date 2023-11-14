import React, { useState } from "react";
import ReactDOM from "react-dom";

//const App = () => {
// save clicks of each button to its own state
//  const [good, setGood] = useState(0);
//  const [neutral, setNeutral] = useState(0);
//  const [bad, setBad] = useState(0);

//  return <div>code here</div>;
//};
const Display = (props) => <div>{props.value}</div>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [value, setValue] = useState(10);

  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const setToGood = (newValue) => {
    setGood(newValue);
  };
  const setToNeutral = (newValue) => {
    setNeutral(newValue);
  };
  const setToBad = (newValue) => {
    setBad(newValue);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h1>Stadistics</h1>
      <div>
        good
        <Display text="good" value={good} />
      </div>
      <div>
        bad
        <Display value={bad} />
      </div>
      <div>
        neutral
        <Display value={neutral} />
      </div>
      <div>
        all
        <Display value={good + neutral + bad} />
      </div>
      <div>
        average
        <Display value={(good - bad) / (good + neutral + bad)} />
      </div>
      <div>
        positive
        <Display value={(good / (good + neutral + bad)) * 100} /> %
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
