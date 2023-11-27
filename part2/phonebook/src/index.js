import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import axios from "axios";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* axios.get("http://localhost:3001/persons").then((response) => {
  const persons = response.data;
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App persons={persons} />
    </React.StrictMode>
  );

}); */