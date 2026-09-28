import React from "react";

const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
      
        <h6 className="card-title fw-bold">{task.title}</h6>
        {task.description && (
          <p className="card-text text-muted small">{task.description}</p>
        )}

        <div className="d-flex flex-wrap gap-2 mb-2">
          {task.tag && <span className="badge bg-info">{task.tag}</span>}
          <span
            className={`badge ${
              task.status === "Done"
                ? "bg-success"
                : task.status === "In Progress"
                ? "bg-warning text-dark"
                : "bg-secondary"
            }`}
          >
            {task.status}
          </span>
        </div>

        {task.repoUrl && (
          <a
            href={task.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="d-block small mb-2 text-truncate"
          >
            🔗 Repository Link: {task.repoUrl}
          </a>
        )}

        {/* تغيير Status */}
        <div className="mb-3">
          <select
            className="form-select form-select-sm"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary w-50"
            onClick={() => onEdit(task)}
          >
            Edit Task UI
          </button>
          <button
            className="btn btn-sm btn-outline-danger w-50"
            onClick={() => onDelete(task.id)}
          >
            Delete Task UI
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;