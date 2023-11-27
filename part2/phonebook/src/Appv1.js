import React, { useState } from "react";
import Filter from "./components/filter";
import PhoneBook from "./components/phonebook";

import "./App.css";

const PersonForm = ({
  newName,
  newNumber,
  addPerson,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("enter name...");
  const [newNumber, setNewNumber] = useState("enter number...");
  const [newId, setNewId] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("enter name...");
      setNewNumber("enter number...");
      setNewId("");
    }
  };
  

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <PhoneBook key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
