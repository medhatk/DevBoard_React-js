import { useState } from "react";

const emptySnippet = { title: "", language: "", code: "", docUrl: "", tag: "" };

function SnippetForm({ onAddSnippet, onCancel }) {
  const [formData, setFormData] = useState(emptySnippet);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim() || !formData.language.trim() || !formData.code.trim()) return;
    onAddSnippet(formData);
    setFormData(emptySnippet);
  };

  return (
    <form className="entity-form snippet-form" onSubmit={handleSubmit}>
      <div className="entity-form-fields">
        <label className="form-field">
          <span>Title</span>
          <input autoFocus name="title" value={formData.title} onChange={handleChange} placeholder="e.g., useDebounce Hook" required />
        </label>
        <div className="form-field-row">
          <label className="form-field">
            <span>Programming language</span>
            <input name="language" value={formData.language} onChange={handleChange} placeholder="e.g., TypeScript" required />
          </label>
          <label className="form-field">
            <span>Tag</span>
            <input name="tag" value={formData.tag} onChange={handleChange} placeholder="e.g., hooks, utility" />
          </label>
        </div>
        <label className="form-field">
          <span>Code</span>
          <textarea className="snippet-code-input" name="code" value={formData.code} onChange={handleChange} placeholder="Paste your reusable code here..." rows={7} required />
        </label>
        <label className="form-field">
          <span>Documentation URL</span>
          <input type="url" name="docUrl" value={formData.docUrl} onChange={handleChange} placeholder="https://..." />
        </label>
      </div>
      <footer className="entity-form-footer">
        <button type="button" className="form-cancel-button" onClick={onCancel}>Cancel</button>
        <button type="submit" className="form-submit-button">Save snippet</button>
      </footer>
    </form>
  );
}

export default SnippetForm;
