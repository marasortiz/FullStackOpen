import React, { useState, useEffect } from "react";

import Country from './components/countryInfo';

import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

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

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseCountry = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      <div>
        filter shown with{" "}
        <input onChange={handleFilterChange} value={filter}></input>
      </div>
      {selectedCountry ? (
        <div>
          <Country country={selectedCountry} />
          <button onClick={handleCloseCountry}>Close</button>
        </div>
      ) : filterCountries.length <= 10 ? (
        filterCountries.length === 1 ? (
          filterCountries.map((e) => {
            return (
              <div key={e.cca3}>
                <Country country={e}/>
              </div>
            );
          })
        ) : (
          filterCountries.map((e) => (
            <p key={e.cca3}>
              {e.name.common}{" "}
              <button onClick={() => handleShowCountry(e)}>show</button>
            </p>
          ))
        )
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
