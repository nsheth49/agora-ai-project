const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/hello', (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
