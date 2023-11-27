import React from "react";

const Country = ({country}) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
        <img
          style={{ width: 100 }}
          src={country.flags.png}
          alt="country flag"
        />
      </div>
    );
};

export default Country;