import { createContext, useContext, useState } from "react";
import {
  getSnippets,
  saveSnippets,
} from "../utils/localStorage";

const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState(getSnippets);

  // Add Snippet
  const addSnippet = (snippet) => {
    const newSnippet = {
      ...snippet,
      id: Date.now(),
    };

    const updatedSnippets = [...snippets, newSnippet];

    setSnippets(updatedSnippets);
    saveSnippets(updatedSnippets);
  };

  // Delete Snippet
  const deleteSnippet = (id) => {
    const updatedSnippets = snippets.filter(
      (snippet) => snippet.id !== id
    );

    setSnippets(updatedSnippets);
    saveSnippets(updatedSnippets);
  };

  return (
    <SnippetContext.Provider
      value={{
        snippets,
        addSnippet,
        deleteSnippet,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippets = () => {
  return useContext(SnippetContext);
};