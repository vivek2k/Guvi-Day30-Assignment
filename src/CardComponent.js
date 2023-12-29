// CardComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import "./style.css"
const CardComponent = () => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedStreet, setEditedStreet] = useState('');
  const [editedSuite, setEditedSuite] = useState('');



  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setData(response.data);
        console.log(response.data)
        // console.log(response.data[0].address)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = (id, currentName, currentUsername, currentEmail, currentPhone, currentStreet, currentSuite) => {
    setEditingId(id);
    setEditedName(currentName);
    setEditedUsername(currentUsername);
    setEditedEmail(currentEmail);
    setEditedPhone(currentPhone);
    setEditedStreet(currentStreet);
    setEditedSuite(currentSuite);


  };

  const handleSave = (id) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id
          ? { ...item, name: editedName, username: editedUsername , email : editedEmail, phone : editedPhone, street : editedStreet, suite : editedSuite}
          : item
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
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
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <br />
              <label>Username: </label>
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
              <br />
              <label>Email: </label>
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <br />
              <label>Phone: </label>
              <input
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />
              <br />
              <label>Street: </label>
              <input
                type="text"
                value={editedStreet}
                onChange={(e) => setEditedStreet(e.target.value)}
              />
              <br />
              <label>Suite: </label>
              <input
                type="text"
                value={editedSuite}
                onChange={(e) => setEditedSuite(e.target.value)}
              />
              <br />

              <button onClick={() => handleSave(item.id)}>Save</button>
            </div>
          ) : (
            <div>
              <h1>{item.id}</h1>

              <h2>{item.name}</h2>
              <p>{item.username}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <strong>Address:</strong>
              {console.log(item.address)}
              
                <p>Street : {item.address.street}</p>
                <p>Suite : {item.address.suite}</p>
                <p>City : {item.address.city}</p>
                <p>Zipcode : {item.address.zipcode}</p>
                <p>Geo lat : {item.address.geo.lat}</p>
                <p>Geo lng: {item.address.geo.lng}</p>
                      <br /><br></br>

              <button onClick={() => handleEdit(item.id, item.name, item.username, item.email, item.phone, item.address.street, item.address.suite)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardComponent;