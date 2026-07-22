import Book from '../models/bookModel.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// @desc    Get all books
// @route   GET /api/books
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Books retrieved successfully', books);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return sendError(res, 'Book not found', 404);
    }
    return sendSuccess(res, 'Book retrieved successfully', book);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new book
// @route   POST /api/books
export const createBook = async (req, res, next) => {
  try {
    const { title, author, isbn, category, quantity, available } = req.body;

    if (!title || !author || !category) {
      return sendError(res, 'Please provide all required fields (title, author, category)', 400);
    }

    // Auto-generate ISBN if not provided
    const resolvedIsbn = isbn || `AUTO-${Date.now()}`;

    const existingBook = await Book.findOne({ isbn: resolvedIsbn });
    if (existingBook) {
      return sendError(res, 'Book with this ISBN already exists', 400);
    }

    const newBook = await Book.create({
      title,
      author,
      isbn: resolvedIsbn,
      category,
      quantity: quantity !== undefined ? quantity : 1,
      available: available !== undefined ? available : (quantity !== undefined ? quantity : 1)
    });

    return sendSuccess(res, 'Book created successfully', newBook, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
export const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedBook) {
      return sendError(res, 'Book not found', 404);
    }

    return sendSuccess(res, 'Book updated successfully', updatedBook);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return sendError(res, 'Book not found', 404);
    }

    return sendSuccess(res, 'Book deleted successfully');
  } catch (error) {
    next(error);
  }
};
