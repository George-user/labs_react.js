import React, { useState } from 'react';

let ContactForm = () => {
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    gender: 'Women' 
  });

  let [errors, setErrors] = useState({});

  let handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };

  let handleSubmit = (event1) => {
    event1.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrors({ message: 'Please fill in all fields' });
      return;
    }
    
    
    console.log('Form submitted:', formData);
    
    setFormData({
      name: '',
      email: '',
      message: '',
      gender: 'Women'
    });
    
  };

  return (
    <div className="contact-form">
      <h2>Contact Form</h2>
      {errors.message && <p className="error">{errors.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Women"
              checked={formData.gender === 'Women'}
              onChange={handleChange}
            />
            Women
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Man"
              checked={formData.gender === 'Man'}
              onChange={handleChange}
            />
            Man
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
