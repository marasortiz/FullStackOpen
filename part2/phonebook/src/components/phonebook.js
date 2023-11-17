import React from "react";

const PhoneBook = ({ person }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  );
};

export default PhoneBook;
