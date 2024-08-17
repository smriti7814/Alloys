
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { Form, Product, Inquiry, Email } = require('./db/db'); 


// Create Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// Handle form submission
app.post('/submit', async (req, res) => {
    try {
        const formData = new Form(req.body);
        await formData.save();
        res.status(200).send('Form submitted successfully');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Error submitting form');
    }
});

app.post('/add-product', async (req, res) => {
    try {
        const formData = new Product(req.body);
        await formData.save();
        res.status(200).send('Product added successfully');
    } catch (error) {
        console.error('Error saving product data:', error);
        res.status(500).send('Error adding product');
    }
});

app.post('/query-form', async (req, res) => {
    try {
        const inquiryData = new Inquiry(req.body);
        await inquiryData.save();
        res.status(200).send('Inquiry submitted successfully');
    } catch (error) {
        console.error('Error saving inquiry data:', error);
        res.status(500).send('Error submitting inquiry');
    }
});

app.post('/submit-email', async (req, res) => {
    try {
      const { email, product } = req.body;
      const newEmail = new Email({ email, product });
      await newEmail.save();
      res.status(201).json({ message: 'Email and product saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving email and product' });
    }
  });
// Serve HTML files
app.get('/contact.html', (req, res) => {
    const filePath = path.join(__dirname, 'contact.html');
    res.sendFile(filePath);
});

app.get('/project.html', (req, res) => {
    const filePath = path.join(__dirname, 'project.html');
    res.sendFile(filePath);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});