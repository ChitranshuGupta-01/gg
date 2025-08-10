// Import React and useState hook for state management
import React, { useState } from "react";
// Import React Router components for navigation and routing
import { Routes, Route, Navigate } from "react-router-dom";
// Import our custom components
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";

export default function App() {
  // State: customers array stored in App (top-level)
  const [customers, setCustomers] = useState([
    // Sample initial data
    {
      id: 1,
      firstName: "Chitranshu",
      lastName: "Gupta",
      email: "C@example.com",
      phone: "9898988989",
    },
    {
      id: 2,
      firstName: "Harsha",
      lastName: "K",
      email: "k@example.com",
      phone: "8989989889",
    },
  ]);

  // Add a new customer
  const addCustomer = (customer) => {
    setCustomers([...customers, { ...customer, id: Date.now() }]); // Assign a unique ID using timestamp
  };

  // Update an existing customer
  const updateCustomer = (updatedCustomer) => {
    setCustomers(
      customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
  };

  // Delete a customer by ID
  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  // Routes for navigation
  return (
    <Routes>
      {/* Redirect root path to /customers */}
      <Route path="/" element={<Navigate to="/customers" />} />

      {/* Customer list page */}
      <Route
        path="/customers"
        element={
          <CustomerList customers={customers} onDelete={deleteCustomer} />
        }
      />

      {/* Add customer page */}
      <Route
        path="/add-customer"
        element={<CustomerForm onSave={addCustomer} />}
      />

      {/* Edit customer page (pass existing customers for lookup) */}
      <Route
        path="/edit-customer/:id"
        element={<CustomerForm customers={customers} onSave={updateCustomer} />}
      />
    </Routes>
  );
}
