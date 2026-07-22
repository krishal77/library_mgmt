import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0
    },
    available: {
      type: Number,
      default: 1,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
