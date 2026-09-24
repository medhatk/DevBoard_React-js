import { useState } from "react";

function SnippetCard({ snippet, onDelete }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(snippet.code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="card h-100">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">
            {snippet.title}
          </h5>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(snippet.id)}
          >
            Delete
          </button>
        </div>

        <div className="mb-3">

          <span className="badge bg-primary me-2">
            {snippet.language}
          </span>

          {snippet.tag && (
            <span className="badge bg-secondary">
              {snippet.tag}
            </span>
          )}

        </div>

        <pre className="bg-dark text-light p-3 rounded">
          <code>{snippet.code}</code>
        </pre>

        <div className="d-flex gap-2 mt-3">

          <button
            className="btn btn-outline-primary"
            onClick={copyCode}
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>

          {snippet.docUrl && (
            <a
              href={snippet.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary"
            >
              Documentation
            </a>
          )}

        </div>

      </div>
    </div>
  );
}

export default SnippetCard;