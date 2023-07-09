const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());
const router = require("./router/Auth");
app.use('/', router)

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for the data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Define a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

// Handle POST request to save form data
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const formData = new FormData({ email, password });
  formData.save()
    .then(() => res.status(201).json({ message: 'Form data saved successfully' }))
    .catch(err => res.status(500).json({ error: 'Error saving form data' }));
});

app.get('/api/profile', async (req, res)=>{
  try {
    const data = await FormData.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
  }
})

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
