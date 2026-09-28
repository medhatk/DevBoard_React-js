import { useState } from "react";
import { BookOpen, Check, Clipboard, Trash2 } from "lucide-react";

function SnippetCard({ snippet, onDelete }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="snippet-card">
      <header className="snippet-card-heading">
        <div className="snippet-card-title-wrap">
          <h2>{snippet.title}</h2>
          <div className="snippet-card-tags">
            {snippet.language && <span className="snippet-language-tag">{snippet.language}</span>}
            {snippet.tag && <span className="snippet-topic-tag">{snippet.tag}</span>}
          </div>
        </div>
        <button type="button" className={`snippet-copy-button ${copied ? "copied" : ""}`} onClick={copyCode} aria-label={`Copy ${snippet.title}`} title={copied ? "Copied" : "Copy code"}>
          {copied ? <Check /> : <Clipboard />}
        </button>
      </header>
      <pre className="snippet-code"><code>{snippet.code}</code></pre>
      <footer className="snippet-card-footer">
        {snippet.docUrl ? (
          <a href={snippet.docUrl} target="_blank" rel="noopener noreferrer"><BookOpen /> Documentation</a>
        ) : <span className="snippet-no-doc"><BookOpen /> No documentation link</span>}
        <button type="button" onClick={() => onDelete(snippet.id)} aria-label={`Delete ${snippet.title}`} title="Delete snippet"><Trash2 /></button>
      </footer>
    </article>
  );
}

export default SnippetCard;
