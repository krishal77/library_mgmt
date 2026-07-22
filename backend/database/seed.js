import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from '../models/bookModel.js';
import User from '../models/userModel.js';

dotenv.config();

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Fiction',
    quantity: 5,
    available: 5
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    category: 'Technology',
    quantity: 3,
    available: 3
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    category: 'Classic',
    quantity: 4,
    available: 4
  }
];

const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    role: 'student'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543210',
    role: 'student'
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '5551234567',
    role: 'admin'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/library_db');
    console.log('Connected to MongoDB for seeding sample data...');

    await Book.deleteMany();
    await User.deleteMany();

    await Book.insertMany(sampleBooks);
    await User.insertMany(sampleUsers);

    console.log('Sample MongoDB data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding MongoDB data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
