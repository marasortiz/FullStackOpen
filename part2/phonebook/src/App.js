import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import PhoneBook from "./components/phonebook";
import personService from "./services/person";
import Notification from "./components/notification";

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("enter name...");
  const [newNumber, setNewNumber] = useState("enter number...");
  const [filter, setFilter] = useState("");

  const [addedMessage, setAddedMessage] = useState(null);
  const [addedStatus, setStatusMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );

      if (confirmed) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
            setAddedMessage(`'${newName}' updated`);
            setStatusMessage("added");
            setTimeout(() => {
              setAddedMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            setAddedMessage(`Updating '${newName}' failed`);
            setStatusMessage("error");
            setTimeout(() => {
              setAddedMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      setAddedMessage(`'${newName}' added`);
      setStatusMessage("added");
      setTimeout(() => {
        setAddedMessage(null);
      }, 5000);

      personService
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
        .catch((error) => {
          console.error("Error adding person:", error);
          setAddedMessage(`Adding '${newName}' failed`);
          setStatusMessage("error");
          setTimeout(() => {
            setAddedMessage(null);
          }, 5000);
        });
    }

    setNewName("enter name...");
    setNewNumber("enter number...");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

const handleDelete = (id, name) => {
  const confirmed = window.confirm(`Delete ${name}?`);

  if (confirmed) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setAddedMessage(`'${name}' deleted`);
        setStatusMessage("error");
        setTimeout(() => {
          setAddedMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
        setAddedMessage(`Deleting '${name}' failed. Person not found.`);
        setStatusMessage("error");
        setTimeout(() => {
          setAddedMessage(null);
        }, 5000);
      });
  }
};
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {<Notification message={addedMessage} state={addedStatus} />}
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
          <PhoneBook
            key={person.id}
            person={person}
            handleDelete={() => handleDelete(person.id, person.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
