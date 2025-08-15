import React, { useState } from 'react';
import './RegistrationPages.css';
import { useNavigate, Link } from 'react-router-dom';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const existingRequirements = JSON.parse(localStorage.getItem('userRequirements')) || [];

    const isDuplicate = existingRequirements.some(
      (user) => user.email === formData.email || user.phone === formData.phone
    );

    if (isDuplicate) {
      alert('A user with this email or phone number already exists.');
      return;
    }

    const userToSave = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      password: formData.password,
      image: '',
      shopId: 'shop123',
      status: 'pending'
    };

    existingRequirements.push(userToSave);
    localStorage.setItem('userRequirements', JSON.stringify(existingRequirements));
    alert('Registration successful! Awaiting shop approval.');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <p className="subtitle">Join us to find the best service providers</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="10-digit Phone"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address *</label>
          <textarea
            name="address"
            placeholder="Address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pincode *</label>
            <input
              type="text"
              name="pincode"
              placeholder="6-digit PIN"
              pattern="[0-9]{6}"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          Register & Await Approval
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegistration;
