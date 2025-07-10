import React, { useState, useEffect, useRef } from "react";
import "./Test1.css";

export default function Test1() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const modalRef = useRef();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name required";
    }
    if (!formData.birthDate.trim() || isNaN(Date.parse(formData.birthDate))) {
      newErrors.birthDate = "Valid birthdate required";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      gender: "",
    });
    setErrors({});
  };

  const handleSubmit = () => {
    // Data in localstorage
    if (validate()) {
      const existing = JSON.parse(localStorage.getItem("userList")) || [];
      existing.push(formData);
      localStorage.setItem("userList", JSON.stringify(existing));

      // success Toast
      alert("✅ User added successfully!");
      setShowModal(false);
      handleClear();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Accessibility: apply inert to background when modal is active
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      if (showModal) {
        mainContent.setAttribute("inert", "");
      } else {
        mainContent.removeAttribute("inert");
      }
    }
  }, [showModal]);

  return (
    <div className="App">
      <div id="main-content">
        <h2>User Management</h2>
        <button onClick={() => setShowModal(true)}>Add User</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal" role="dialog" aria-modal="true" ref={modalRef}>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              x
            </button>
            <h3>Add User</h3>
            <div className="form-field">
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName && "error-border"}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div className="form-field">
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName && "error-border"}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
            <div className="form-field">
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={errors.birthDate && "error-border"}
              />
              {errors.birthDate && (
                <span className="error">{errors.birthDate}</span>
              )}
            </div>
            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email && "error-border"}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-field">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender && "error-border"}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>
            <div className="button-group">
              <button onClick={handleClear}>Clear</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
