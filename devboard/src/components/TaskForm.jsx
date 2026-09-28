import { useEffect, useState } from "react";

const initialFormData = {
  title: "",
  description: "",
  tag: "",
  repoUrl: "",
  status: "To Do",
};

const TaskForm = ({ onAddTask, onEditTask, editingTask, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(editingTask || initialFormData);
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim()) return;
    if (editingTask) onEditTask(formData);
    else onAddTask(formData);
  };

  return (
    <form className="entity-form task-form" onSubmit={handleSubmit}>
      <div className="entity-form-fields">
        <label className="form-field">
          <span>Title</span>
          <input autoFocus name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Implement OAuth2 refresh token rotation" required />
        </label>
        <label className="form-field">
          <span>Description</span>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Add a brief summary or acceptance criteria..." rows={3} />
        </label>
        <label className="form-field">
          <span>Tag</span>
          <input name="tag" value={formData.tag} onChange={handleChange} placeholder="Select or type a tag (e.g. backend, frontend, infra)..." />
        </label>
        <label className="form-field">
          <span>Repository URL</span>
          <input type="url" name="repoUrl" value={formData.repoUrl} onChange={handleChange} placeholder="https://github.com/org/repo" />
        </label>
        <fieldset className="form-field task-status-field">
          <legend>Status</legend>
          <div className="task-status-options">
            {["To Do", "In Progress", "Done"].map((status) => (
              <label className={`task-status-option ${formData.status === status ? "selected" : ""}`} key={status}>
                <input type="radio" name="status" value={status} checked={formData.status === status} onChange={handleChange} />
                <span className="task-status-dot" />{status}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <footer className="entity-form-footer">
        <button type="button" className="form-cancel-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="form-submit-button">{editingTask ? "Save changes" : "Create task"}</button>
      </footer>
    </form>
  );
};

export default TaskForm;
