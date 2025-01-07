const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Handle form submission
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    res.json({ status: 'success' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
