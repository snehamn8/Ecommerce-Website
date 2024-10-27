// backend/populateCategories.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const categories = [
  { name: 'Technology' },
  { name: 'Health' },
  { name: 'Finance' },
  { name: 'Education' },
  { name: 'Entertainment' },
  // Add more categories as needed
];

Category.insertMany(categories)
  .then(() => {
    console.log('Categories inserted');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting categories:', error);
  });