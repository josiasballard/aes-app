// src/widgets/NotificationsWidget.js
import React, { useState } from 'react';
import './styles/NotificationsWidget.css';

function NotificationsWidget({ notifications = [] }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    // Expanded view for a selected notification
    return (
      <div className="glass-card notifications-widget">
        <button
          className="btn btn-primary notifications-back-button"
          onClick={() => setSelected(null)}
        >
          ← Back
        </button>
        <h3 className="notifications-heading">Notification Details</h3>
        <div className="notification-details">
          <strong>{selected.sender}</strong>
          <p>{selected.text}</p>
        </div>
      </div>
    );
  }

  // List view of notifications
  return (
    <div className="glass-card notifications-widget">
      <h3 className="notifications-heading">Notifications</h3>
      <div className="notifications-list-container">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => setSelected(notif)}
              className={`notification-item ${
                notif.read ? 'notification-read' : 'notification-unread'
              }`}
            >
              {notif.text}
            </div>
          ))
        ) : (
          <div className="no-notifications">
            No notifications ❗
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsWidget;
