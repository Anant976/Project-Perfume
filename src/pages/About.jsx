import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About Enchanted Alchemy</h1>
      <div className="about-content">
        <section>
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Enchanted Alchemy has been dedicated to bringing the world's finest fragrances 
            to fragrance enthusiasts everywhere. What started as a passion project has grown into a trusted 
            online destination for premium perfumes.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            To provide exceptional fragrances that inspire confidence, create memorable moments, and allow 
            our customers to express their unique personalities through scent.
          </p>
        </section>

        <section>
          <h2>Why Choose Us</h2>
          <ul>
            <li>Carefully curated selection of premium fragrances</li>
            <li>Competitive pricing with regular promotions</li>
            <li>Fast and secure shipping worldwide</li>
            <li>Knowledgeable customer support team</li>
            <li>30-day satisfaction guarantee</li>
          </ul>
        </section>

        <section>
          <h2>Quality Assurance</h2>
          <p>
            All our fragrances are authentic and sourced directly from authorized distributors. 
            We guarantee 100% satisfaction with every purchase.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
