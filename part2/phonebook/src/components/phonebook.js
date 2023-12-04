import React from "react";

const PhoneBook = ({ person, handleDelete }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number} &nbsp;
      <button onClick={handleDelete}>Delete</button>
    </p>
  );
};

export default PhoneBook;
