const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Store todos to keep consistent data between requests
let allTodos = [];

function generateSequentialTodos(count = 5) {
  const todos = [];
  const todoTemplates = [
    { title: "Complete project", description: "Finish the current project milestone" },
    { title: "Learn new skill", description: "Study a new programming language or framework" },
    { title: "Exercise", description: "Go for a 30-minute workout" },
    { title: "Read a book", description: "Read a chapter from a technical book" },
    { title: "Organize workspace", description: "Clean and arrange the work desk" },
    { title: "Network", description: "Connect with a professional on LinkedIn" },
    { title: "Plan weekly goals", description: "Create a detailed plan for the upcoming week" },
    { title: "Review code", description: "Do a code review for team project" },
    { title: "Attend webinar", description: "Join an online tech conference" },
    { title: "Practice algorithms", description: "Solve coding challenges on LeetCode" },
  ];

  for (let i = 0; i < count; i++) {
    const template = todoTemplates[i % todoTemplates.length];
    todos.push({
      id: i + 1, // Sequential ID starting from 1
      title: template.title,
      description: template.description,
    });
  }

  return todos;
}

// Generate todos when the server starts
allTodos = generateSequentialTodos(10);

// Route to get todos with optional id query parameter
app.get("/todos", (req, res) => {
  const todoId = req.query.id;

  // If an ID is provided, return a single todo as an object instead of wrapping it in an array
  if (todoId) {
    const id = parseInt(todoId);
    const todo = allTodos.find((todo) => todo.id === id);

    if (todo) {
      return res.json({ todos: todo }); // Return a single object instead of an array
    } else {
      return res.status(404).json({ error: "Todo not found" });
    }
  }

  // If no ID is provided, return the full array
  res.json({ todos: allTodos });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
