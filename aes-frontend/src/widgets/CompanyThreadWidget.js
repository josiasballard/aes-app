// src/widgets/CompanyThreadWidget.js
import React from 'react';
import './styles/CompanyThreadWidget.css';

function CompanyThreadWidget({ messages = [] }) {
  return (
    <div className="glass-card company-thread-widget">
      <h3 className="company-thread-heading">Company Thread</h3>
      <div className="company-thread-messages">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="company-thread-message">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        ) : (
          <div className="no-messages">No messages ❗</div>
        )}
      </div>
    </div>
  );
}

export default CompanyThreadWidget;
