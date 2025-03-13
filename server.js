const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Store todos to keep consistent data between requests
let allTodos = [];

function generateRandomTodos(count = 5) {
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
    { title: "Practice algorithms", description: "Solve coding challenges on LeetCode" }
  ];
  
  for (let i = 0; i < count; i++) {
    const template = todoTemplates[Math.floor(Math.random() * todoTemplates.length)];
    todos.push({
      id: Math.floor(Math.random() * 100) + 1,
      title: template.title,
      description: template.description
    });
  }
  
  return todos;
}

// Generate todos when the server starts
allTodos = generateRandomTodos(10);

// Route to get todos with optional id query parameter
app.get('/todos', (req, res) => {
  const todoId = req.query.id;
  
  // If todoId is provided, return only that specific todo
  if (todoId) {
    const id = parseInt(todoId);
    const todo = allTodos.find(todo => todo.id === id);
    
    if (todo) {
      return res.json({ todo });
    } else {
      return res.status(404).json({ error: "Todo not found" });
    }
  }
  
  // If no todoId, return all todos
  res.json({ todos: allTodos });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
