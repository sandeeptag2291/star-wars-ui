import React, { useState } from "react";

function StarWarsSearch() {
  const [type, setType] = useState("Vehicles");
  const [name, setName] = useState("Sand Crawler");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/search?type=${encodeURIComponent(type)}&name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error("Error fetching data");
      const data = await res.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h2>Star Wars Search</h2>

      <div>
        <label>Type: </label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>Planets</option>
          <option>Spaceships</option>
          <option>Vehicles</option>
          <option>People</option>
          <option>Films</option>
          <option>Species</option>
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Name: </label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>

      <button style={{ marginTop: "10px" }} onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Count:</strong> {result.count}</p>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Films:</strong></p>
          <ul>
            {(result.films || []).map((film, index) => (
              <li key={index}>{film}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StarWarsSearch;
