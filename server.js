// backend/server.js
// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Category = require('./models/Category'); // Adjust the path as necessary\

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Fetch Categories
app.get('/trpc/getCategories', async (req, res) => {
  const { page } = req.query;
  const categoriesPerPage = 10; // Adjust based on your needs
  const categories = await Category.find()
    .skip((page - 1) * categoriesPerPage)
    .limit(categoriesPerPage);
  res.json(categories);
});

// Save User Preferences (assumed to be an array of category IDs)
app.post('/trpc/savePreferences', async (req, res) => {
  const { categoryIds } = req.body;
  // Here you would save user preferences to the database
  // This could be a separate User model where you store user preferences
  console.log('Saved preferences:', categoryIds);
  res.status(200).send('Preferences saved successfully!');
});

app.use('./api',authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});




// mongoose.connect('mongodb://localhost:27017/ecommerce', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((error) => {
//   console.error('MongoDB connection error:', error);
// });
