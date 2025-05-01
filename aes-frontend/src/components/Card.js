// src/components/Card.js
import React from 'react';
import './Card.css';

function Card({ children, style }) {
  return (
    <div className="card-container glass-card" style={style}>
      {children}
    </div>
  );
}

export default Card;
