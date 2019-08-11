const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  const info = {
    success: true,
  };

  res.json(info);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
