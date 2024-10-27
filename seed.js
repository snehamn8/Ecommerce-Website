// backend/seed.js


const mongoose = require('mongoose');
const faker = require('@faker-js/faker').faker;
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  return seedCategories();
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

async function seedCategories() {
  try {
    await Category.deleteMany(); // Clear existing categories
    
    const categories = Array.from({ length: 100 }, () => ({
      name: faker.commerce.department()
    }));

    await Category.insertMany(categories);
    console.log('Successfully seeded categories');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  }
}
