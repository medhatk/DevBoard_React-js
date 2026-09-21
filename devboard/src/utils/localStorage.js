const TASKS_KEY = "devboard_tasks";
const SNIPPETS_KEY = "devboard_snippets";
const THEME_KEY = "devboard_theme";

// Tasks
export const getTasks = () => {
const tasks = localStorage.getItem(TASKS_KEY);
return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Snippets
export const getSnippets = () => {
const snippets = localStorage.getItem(SNIPPETS_KEY);
return snippets ? JSON.parse(snippets) : [];
};

export const saveSnippets = (snippets) => {
localStorage.setItem(SNIPPETS_KEY, JSON.stringify(snippets));
};

// Theme
export const getTheme = () => {
return localStorage.getItem(THEME_KEY) || "light";
};

export const saveTheme = (theme) => {
localStorage.setItem(THEME_KEY, theme);
};