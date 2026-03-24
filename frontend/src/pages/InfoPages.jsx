import React from 'react';

export const About = () => (
  <div className="container mt-2" style={{ maxWidth: '800px', paddingBottom: '4rem' }}>
    <h1 style={{ color: 'var(--accent-color)', marginBottom: '2rem' }}>About URBANGENTS</h1>
    <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '12px', lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1.5rem' }}>URBANGENTS APPARELS is a premium local menswear brand dedicated to completely redefining urban elegance.</p>
      <p style={{ marginBottom: '1.5rem' }}>Founded with a passion for meticulous tailoring and modern aesthetics, we source the finest materials to create clothing that speaks volumes before you even say a word.</p>
      <p>Whether you're looking for high-end casual wear or luxury statement pieces, URBANGENTS ensures you step out with absolute confidence.</p>
    </div>
  </div>
);

export const Returns = () => (
  <div className="container mt-2" style={{ maxWidth: '800px', paddingBottom: '4rem' }}>
    <h1 style={{ color: 'var(--accent-color)', marginBottom: '2rem' }}>Return Policy</h1>
    <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '12px', lineHeight: '1.8' }}>
      <h3 style={{ marginBottom: '1rem' }}>14-Day Guarantee</h3>
      <p style={{ marginBottom: '1.5rem' }}>We accept returns within 14 days of delivery. Items must be unworn, unwashed, and have original tags attached.</p>
      <h3 style={{ marginBottom: '1rem' }}>How to Return</h3>
      <p>Please contact support@urbangents.com.ng with your Order Number to initiate a return. Customers are responsible for return shipping costs unless the item arrived damaged or incorrect.</p>
    </div>
  </div>
);

export const SizeGuide = () => (
  <div className="container mt-2" style={{ maxWidth: '800px', paddingBottom: '4rem' }}>
    <h1 style={{ color: 'var(--accent-color)', marginBottom: '2rem' }}>Size Guide</h1>
    <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '12px', lineHeight: '1.8' }}>
      <p style={{ marginBottom: '1.5rem' }}>Our apparel runs true to international sizing standards with a modern, tailored fit. If you prefer a looser fit, we recommend sizing up.</p>
      
      <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Tops (Chest)</h3>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>M:</strong> 38-40"</li>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>L:</strong> 42-44"</li>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>XL:</strong> 46-48"</li>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>XXL:</strong> 50-52"</li>
      </ul>

      <h3 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Bottoms (Waist)</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>M:</strong> 32-34"</li>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>L:</strong> 34-36"</li>
        <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><strong>XL:</strong> 38-40"</li>
      </ul>
    </div>
  </div>
);
