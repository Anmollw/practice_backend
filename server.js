const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3031;

// Middleware
app.use(cors());
app.use(express.json());

// Store todos to keep consistent data between requests
let allTodos = [];

function generateSequentialTodos(count = 5) {
  const todos = [];
  const todoTemplates = [
    { title: "Todo 1", description: "This is todo 1" },
    { title: "Todo 2", description: "This is todo 2" },
    { title: "Todo 3", description: "This is todo 3" },
    { title: "Todo 4", description: "This is todo 4" },
    { title: "Todo 5", description: "This is todo 5" },
    { title: "Todo 6", description: "This is todo 6" },
    { title: "Todo 7", description: "This is todo 7" },
    { title: "Todo 8", description: "This is todo 8" },
    { title: "Todo 9", description: "This is todo 9" },
    { title: "Todo 10", description: "This is todo 10" },
  ];

  for (let i = 0; i < count; i++) {
    const template = todoTemplates[i % todoTemplates.length];
    todos.push({
      id: i + 1, // Sequential ID starting from 1
      title: template.title,
      description: template.description,
      completed: false
    });
  }
  
  return todos;
}

// Generate todos when the server starts
allTodos = generateSequentialTodos(10);

// Route to get notifications
app.get('/notifications', (req, res) => {
  const notifications = {
    network: (Math.floor(Math.random() * 10)),
    jobs: (Math.floor(Math.random() * 10)),
    messaging: (Math.floor(Math.random() * 10)),
    notifications: (Math.floor(Math.random() * 10)),
  };
  
  res.json({notifications});
});

// Route to get todos with optional id query parameter
app.get("/todos", (req, res) => {
  const todoId = req.query.id;

  // If an ID is provided, return a single todo as an object
  if (todoId) {
    const id = parseInt(todoId);
    const todo = allTodos.find((todo) => todo.id === id);

    if (todo) {
      return res.json({ todo: todo }); // Return as "todo" instead of "todos"
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
