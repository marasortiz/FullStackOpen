import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

import axios from "axios";


axios.get("http://localhost:3001/notes").then((response) => {
  const notes = response.data;
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App notes={notes} />
    </React.StrictMode>
  );

});


