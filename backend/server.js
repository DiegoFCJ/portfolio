// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

app.get('/api/github/readme', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/repos/DiegoFCJ/DiegoFCJ/readme', {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY_GITHUB}`,
        'Accept': 'application/vnd.github.v3.raw',
      }
    });

    res.json({ readme: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching GitHub Readme' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
