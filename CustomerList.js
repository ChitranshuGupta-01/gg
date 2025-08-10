// Import React
import React from "react";
// Import Link from React Router to navigate between pages
import { Link } from "react-router-dom";

export default function CustomerList({ customers, onDelete }) {
  return (
    <div style={{ width: "600px", margin: "auto" }}>
      <h2>Customer List</h2>

      {/* Button to navigate to Add Customer form */}
      <Link to="/add-customer">
        <button style={{ marginBottom: "10px" }}>Add Customer</button>
      </Link>

      {/* Table to display customer data */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through customers and render each row */}
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                {c.firstName} {c.lastName}
              </td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                {/* Link to edit form with customer ID */}
                <Link to={`/edit-customer/${c.id}`}>
                  <button>Edit</button>
                </Link>

                {/* Delete button calls onDelete prop */}
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => onDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
