// CardComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./style.css"

const CardComponent = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the ID of the card being edited

  useEffect(() => {
    // Fetch data from API using Axios
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id, updatedData) => {
    // Implement your save/update logic here
    console.log(`Saving changes for card with ID: ${id}`, updatedData);
    // Update the state to reflect the changes
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
    setEditingId(null); // Reset editing state
  };

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Deleting card with ID: ${id}`);
    // Update the state to remove the deleted item
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  return (
    <div className="card-container">
      {data.map(item => (
        <div key={item.id} className="card">
          {editingId === item.id ? (
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleSave(item.id, { name: e.target.value })}
              />
              <br />
              <label>Username: </label>
              <input
                type="text"
                value={item.username}
                onChange={(e) => handleSave(item.id, { username: e.target.value })}
              />
              <br />
              <button onClick={() => handleSave(item.id, item)}>Save</button>
            </div>
          ) : (
            <div>
              <h2>{item.name}</h2>
              <p>{item.username}</p>
              <p>{item.phone}</p>

              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
