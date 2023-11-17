import React from "react";

const PhoneBook = ({ person }) => {
  return <p key={person.id}>{person.name}</p>;
};

export default PhoneBook;
