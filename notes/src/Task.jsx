import React, { useState } from 'react';
import './Task.css';

const Task = ({ text, completed, color, onDelete, onToggleComplete }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    setEditing(false);
    // Burada editedText'i kullanarak görevi güncelleme işlemi yapılabilir.
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedText(text);
  };

  return (
    <div className={`task-container ${completed ? 'completed' : ''}`} style={{ backgroundColor: color }}>
      <div className="task-content">
        {!editing ? (
          <div className="task-text" onClick={onToggleComplete}>
            {text}
          </div>
        ) : (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
        )}
        <div className="task-actions">
          {!editing ? (
            <>
              <span className="edit-icon" onClick={handleEdit}>
                ✎
              </span>
              <span className="complete-icon" onClick={onToggleComplete}>
                ✔
              </span>
            </>
          ) : (
            <>
              <span className="save-icon" onClick={handleSaveEdit}>
                ✔
              </span>
              <span className="cancel-icon" onClick={handleCancelEdit}>
                ✘
              </span>
            </>
          )}
          <span className="delete-icon" onClick={onDelete}>
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
};

export default Task;
