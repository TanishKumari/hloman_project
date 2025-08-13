import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FranchiseeRegistration.css';

const FranchiseeRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    gstNumber: '',
    businessName: '',
    experience: '',
    website: '',
    businessImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, businessImage: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem('franchiseeRequests')) || [];
    const newEntry = {
      ...formData,
      status: 'Pending',
      userType: 'franchisee', // ✅ Important fix
      image: formData.businessImage,
    };
    localStorage.setItem('franchiseeRequests', JSON.stringify([...existing, newEntry]));

    alert('Franchisee registration submitted!');
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="registration-form">
        <h2>Franchisee Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input type="tel" name="phone" required pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Business Name *</label>
              <input type="text" name="businessName" required value={formData.businessName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>GST Number *</label>
              <input type="text" name="gstNumber" required value={formData.gstNumber} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea name="address" rows="2" required value={formData.address} onChange={handleChange}></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Pincode *</label>
              <input type="text" name="pincode" required pattern="[0-9]{6}" value={formData.pincode} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Years of Experience *</label>
              <input type="number" name="experience" required min="0" value={formData.experience} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Upload Business Image *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} required />
          </div>

          <div className="button-wrapper">
            <button type="submit" className="submit-btn">Submit Franchisee Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FranchiseeRegistration;
