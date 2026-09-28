import { useEffect, useMemo, useState } from "react";
import { BookOpen, Code2, Plus } from "lucide-react";
import SnippetForm from "../components/SnippetForm";
import SnippetCard from "../components/SnippetCard";
import FormModal from "../components/FormModal";
import { useSnippets } from "../context/SnippetContext";

function SnippetsPage() {
  const { snippets, addSnippet, deleteSnippet } = useSnippets();
  const [languageFilter, setLanguageFilter] = useState("All languages");
  const [tagFilter, setTagFilter] = useState("All tags");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const openForm = () => setShowForm(true);
    window.addEventListener("open-new-snippet-form", openForm);
    return () => window.removeEventListener("open-new-snippet-form", openForm);
  }, []);

  const languages = [...new Set(snippets.map((snippet) => snippet.language).filter(Boolean))].sort();
  const tags = [...new Set(snippets.map((snippet) => snippet.tag).filter(Boolean))].sort();
  const visibleSnippets = useMemo(() => snippets.filter((snippet) =>
    (languageFilter === "All languages" || snippet.language === languageFilter) &&
    (tagFilter === "All tags" || snippet.tag === tagFilter)
  ), [snippets, languageFilter, tagFilter]);

  const handleAddSnippet = (snippet) => {
    addSnippet(snippet);
    setShowForm(false);
  };

  return (
    <div className="snippets-page">
      <header className="snippets-page-heading">
        <div>
          <div className="snippets-title-line">
            <h1>Snippets</h1>
            <span>{snippets.length} saved {snippets.length === 1 ? "snippet" : "snippets"}</span>
          </div>
          <p>Curated building blocks, utility patterns, and reusable code for your projects.</p>
        </div>
        <button type="button" className="snippet-add-button" onClick={() => setShowForm((open) => !open)}>
          <Plus /> {showForm ? "Close" : "Add snippet"}
        </button>
      </header>

      {showForm && (
        <FormModal title="New snippet" onClose={() => setShowForm(false)}>
          <SnippetForm onAddSnippet={handleAddSnippet} onCancel={() => setShowForm(false)} />
        </FormModal>
      )}

      <div className="snippets-toolbar">
        <div className="snippet-filters">
          <label>
            <span className="visually-hidden">Filter by language</span>
            <select value={languageFilter} onChange={(event) => setLanguageFilter(event.target.value)}>
              <option>All languages</option>
              {languages.map((language) => <option key={language}>{language}</option>)}
            </select>
          </label>
          <label>
            <span className="visually-hidden">Filter by tag</span>
            <select value={tagFilter} onChange={(event) => setTagFilter(event.target.value)}>
              <option>All tags</option>
              {tags.map((tag) => <option key={tag}>{tag}</option>)}
            </select>
          </label>
        </div>
        <span className="snippet-count"><BookOpen /> Showing {visibleSnippets.length} of {snippets.length}</span>
      </div>

      {visibleSnippets.length ? (
        <div className="snippets-grid">
          {visibleSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} onDelete={deleteSnippet} />
          ))}
        </div>
      ) : (
        <div className="snippets-empty-state">
          <div className="snippets-empty-icon"><Code2 /></div>
          <h2>{snippets.length ? "No snippets match these filters" : "No snippets saved yet"}</h2>
          <p>{snippets.length ? "Try changing the language or tag filters." : "Save a reusable piece of code to find it quickly next time."}</p>
          {!snippets.length && <button type="button" onClick={() => setShowForm(true)}><Plus /> Add your first snippet</button>}
        </div>
      )}
    </div>
  );
}

export default SnippetsPage;
