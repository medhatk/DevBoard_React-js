import { useState } from "react";

function SnippetForm({ onAddSnippet }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [tag, setTag] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !language || !code) {
      return;
    }

    const snippet = {
      title: title,
      language: language,
      code: code,
      docUrl: docUrl,
      tag: tag
    };

    onAddSnippet(snippet);

    setTitle("");
    setLanguage("");
    setCode("");
    setDocUrl("");
    setTag("");
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h4 className="mb-3">Add New Snippet</h4>

      <div className="mb-3">
        <label className="form-label">Title</label>

        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter snippet title"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Programming Language
        </label>

        <input
          type="text"
          className="form-control"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="JavaScript"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Code</label>

        <textarea
          className="form-control"
          rows="6"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Documentation URL
        </label>

        <input
          type="url"
          className="form-control"
          value={docUrl}
          onChange={(e) => setDocUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tag</label>

        <input
          type="text"
          className="form-control"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="React"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Snippet
      </button>
    </form>
  );
}

export default SnippetForm;