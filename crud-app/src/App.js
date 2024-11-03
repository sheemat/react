
import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUserIndex, setEditUserIndex] = useState(null);
  const [editUser, setEditUser] = useState({ name: '', email: '' });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, newUser]);
      setNewUser({ name: '', email: '' });
    }
  };

  // Edit an existing user
  const handleEditUser = (index) => {
    setEditUserIndex(index);
    setEditUser(users[index]);
  };

  // Update user details
  const handleUpdateUser = () => {
    const updatedUsers = users.map((user, index) =>
      index === editUserIndex ? editUser : user
    );
    setUsers(updatedUsers);
    setEditUserIndex(null);
    setEditUser({ name: '', email: '' });
  };

  // Delete a user
  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mt-5">
      <h2>Simple React CRUD App</h2>

      {/* Add User Section */}
      <div className="mb-4">
        <h4>Add User</h4>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <button onClick={handleAddUser} className="btn btn-primary">
          Add User
        </button>
      </div>

      {/* User List Section */}
      <h4>User List</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleEditUser(index)}
                  className="btn btn-warning btn-sm mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(index)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Section */}
      {editUserIndex !== null && (
        <div className="mt-4">
          <h4>Edit User</h4>
          <input
            type="text"
            placeholder="Name"
            value={editUser.name}
            onChange={(e) =>
              setEditUser({ ...editUser, name: e.target.value })
            }
            className="form-control mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            className="form-control mb-2"
          />
          <button onClick={handleUpdateUser} className="btn btn-success">
            Update User
          </button>
        </div>
      )}
    </div>
  );
}

export default App;