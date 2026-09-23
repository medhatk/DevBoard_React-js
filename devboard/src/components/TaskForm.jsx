import { useState, useEffect } from "react";

const TaskForm = ({ onAddTask, onEditTask, editingTask, setEditingTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    repoUrl: "",
    status: "To Do"
  });

  useEffect(() => {
    if (editingTask) setFormData(editingTask);
    else setFormData({ title: "", description: "", tag: "", repoUrl: "", status: "To Do" });
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("Title is required");
    if (editingTask) onEditTask(formData);
    else onAddTask({ ...formData, id: Date.now().toString() });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{editingTask ? "Edit Task" : "Add New Task"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title *</label>
            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows={3} />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Tag</label>
              <input type="text" className="form-control" name="tag" value={formData.tag} onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Repository Link</label>
            <input type="url" className="form-control" name="repoUrl" value={formData.repoUrl} onChange={handleChange} placeholder="https://github.com/..." />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">{editingTask ? "Update Task" : "Add Task"}</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;