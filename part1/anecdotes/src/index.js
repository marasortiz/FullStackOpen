import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(-1);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const getMaxVoted = () => {
    return votes.indexOf(Math.max(...votes));
  };

  const maxVotedIndex = getMaxVoted();

  if (selected === -1) {
    return (
      <div>
        <button onClick={getRandomAnecdote}>Show A Random Anecdote</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>Votes: {votes[selected]}</p>
      </div>
      <button onClick={handleVote}>Vote for this Anecdote</button>
      <button onClick={getRandomAnecdote}>Show Another Random Anecdote</button>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[maxVotedIndex]}</p>
        <p>Votes: {votes[maxVotedIndex]}</p>
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
