import SnippetForm from "../components/SnippetForm";
import SnippetCard from "../components/SnippetCard";
import { useSnippets } from "../context/SnippetContext";

function SnippetsPage() {
  const {
    snippets,
    addSnippet,
    deleteSnippet
  } = useSnippets();

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h1>Snippets</h1>

        <p className="text-muted">
          Save and manage your useful code snippets.
        </p>
      </div>

      <SnippetForm
        onAddSnippet={addSnippet}
      />

      {snippets.length === 0 ? (

        <div className="text-center p-5">
          <h4>No snippets yet</h4>

          <p className="text-muted">
            Add your first code snippet to get started.
          </p>
        </div>

      ) : (

        <div className="row g-4">

          {snippets.map((snippet) => (

            <div
              className="col-12 col-md-6 col-lg-4"
              key={snippet.id}
            >
              <SnippetCard
                snippet={snippet}
                onDelete={deleteSnippet}
              />
            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default SnippetsPage;