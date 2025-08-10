// Import React, useState and useEffect hooks
import React, { useState, useEffect } from "react";
// Import navigation hooks from React Router
import { useNavigate, useParams, Link } from "react-router-dom";

export default function CustomerForm({ customers = [], onSave }) {
  // For navigation after save
  const navigate = useNavigate();

  // Get the ":id" param from the URL (only present on edit)
  const { id } = useParams();

  // Boolean to check if we are editing instead of adding
  const isEdit = Boolean(id);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Error state for form validation messages
  const [error, setError] = useState("");

  // Prefill the form if editing
  useEffect(() => {
    if (isEdit) {
      const customer = customers.find((c) => c.id === Number(id));
      if (customer) setFormData(customer);
    }
  }, [id, isEdit, customers]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation function
  const validate = () => {
    const { firstName, lastName, email, phone } = formData;
    if (!firstName || !lastName || !email || !phone)
      return "All fields are required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits";
    return "";
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const err = validate();
    if (err) return setError(err); // Show error if validation fails

    if (isEdit) {
      // Update existing customer
      onSave({ ...formData, id: Number(id) });
    } else {
      // Add new customer
      onSave(formData);
    }

    // Navigate back to customers list
    navigate("/customers");
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      {/* Back link */}
      <Link to="/customers">{"< Back to Customers List"}</Link>

      {/* Title changes depending on mode */}
      <h2>{isEdit ? "Edit Customer" : "Add Customer"}</h2>

      {/* Display error message if present */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Form for customer data */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        {/* Submit button text changes based on mode */}
        <button type="submit" style={{ marginTop: "10px" }}>
          {isEdit ? "Update" : "Create"} Customer
        </button>
      </form>
    </div>
  );
}
