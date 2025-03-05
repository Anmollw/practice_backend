const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Function to generate random todos
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
      id: i + 1,
      title: template.title,
      description: template.description,
      completed: Math.random() < 0.3 // 30% chance of being completed
    });
  }

  return todos;
}

// Route to get random todos
app.get('/todos', (req, res) => {
  const todos = generateRandomTodos();
  res.json(todos);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
