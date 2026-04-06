import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <span className="info-icon">📧</span>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:info@enchantedalchemy.com">info@enchantedalchemy.com</a></p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p><a href="tel:+1234567890">+91 99719 77499</a></p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🕒</span>
            <div>
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p>Saturday - Sunday: 10:00 AM - 4:00 PM EST</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send us a Message</h2>
          
          {submitted && <p className="success-message">Thank you! We'll get back to you soon.</p>}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
