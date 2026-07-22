import mongoose from 'mongoose';
import Book from '../models/bookModel.js';
import User from '../models/userModel.js';

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

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library_db';
    let conn;
    try {
      // Allow up to 10s for Atlas cloud DNS & SSL connection
      conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
      console.log(`MongoDB Connected successfully to host: ${conn.connection.host}`);
    } catch (err) {
      console.log(`Primary MongoDB connection failed (${err.message}). Starting MongoMemoryServer fallback...`);
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      conn = await mongoose.connect(uri);
      console.log(`In-Memory MongoDB Connected at ${uri}`);
    }

    // Auto-seed initial sample data if Atlas DB collection is empty
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      await Book.insertMany(sampleBooks);
      console.log('Seeded sample books into MongoDB');
    }
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(sampleUsers);
      console.log('Seeded sample users into MongoDB');
    }
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
