// src/widgets/TaskWidget.js
import React from 'react';
import './styles/TaskWidget.css';

function TaskWidget({ tasks = [] }) {
  return (
    <div className="glass-card task-widget">
      <h3>Task List</h3>
      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      ) : (
        <div className="no-tasks">
          No tasks found ❗
        </div>
      )}
    </div>
  );
}

export default TaskWidget;
