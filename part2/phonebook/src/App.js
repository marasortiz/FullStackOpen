import React, { useState } from "react";
import PhoneBook from "./components/phonebook";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);

  const [newName, setNewName] = useState("enter name...");
  const [newNumber, setNewNumber] = useState("enter number...");
  const [newId, setNewId] = useState("");

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
      setNewId(""); // Reset newId after adding a person
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
{/*         <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div> */}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <PhoneBook key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
