const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const formSchema = new mongoose.Schema({
  name: String,
  company: String,
  tel: String,
  email: String,
  inquiry: String,
});

const Form = mongoose.model('Form', formSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (for your HTML)
app.use(express.static('public'));

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.send('Form submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting form');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
