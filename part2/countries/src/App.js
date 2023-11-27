import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    setFilterCountries(
      countries.filter(
        (country) =>
          country.name.common.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      )
    );
  }, [countries, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <div>
        filter shown with{" "}
        <input onChange={handleFilterChange} value={filter}></input>
      </div>
      {filterCountries.length <= 10 ? (
        filterCountries.length === 1 ? (
          filterCountries.map((e) => {
            return (
              <div key={e.cca3}>
                <h1>{e.name.common}</h1>
                <p>capital {e.capital}</p>
                <p>population {e.population}</p>
                <h3>languages</h3>
                <ul>
                  {Object.values(e.languages).map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
                <img
                  style={{ width: 100 }}
                  src={e.flags.png}
                  alt="country flag"
                />
              </div>
            );
          })
        ) : (
          filterCountries.map((e) => <p key={e.cca3}>{e.name.common}</p>)
        )
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
