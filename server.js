const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const userData = {
  name: "Anmol",
  email: "anmolw@gmail.com",
  address: {
    city: "Delhi",
    state: "Delhi",
    houseNumber: "24"
  }
};

app.get('/user', (req, res) => {
  res.json(userData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
