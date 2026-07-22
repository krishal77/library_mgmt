import Issue from '../models/issueModel.js';
import Book from '../models/bookModel.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// @desc    Get all issues (populated with book + user details)
// @route   GET /api/issues
export const getIssues = async (req, res, next) => {
  try {
    const issues = await Issue.find()
      .populate('book', 'title author isbn category')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    return sendSuccess(res, 'Issues retrieved successfully', issues);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
export const getIssueById = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('book', 'title author isbn category')
      .populate('user', 'name email phone');
    if (!issue) {
      return sendError(res, 'Issue not found', 404);
    }
    return sendSuccess(res, 'Issue retrieved successfully', issue);
  } catch (error) {
    next(error);
  }
};

// @desc    Issue a book to a user
// @route   POST /api/issues
export const createIssue = async (req, res, next) => {
  try {
    const { book: bookId, user: userId, dueDate } = req.body;

    if (!bookId || !userId || !dueDate) {
      return sendError(res, 'Book, user, and dueDate are required', 400);
    }

    // Check book availability
    const book = await Book.findById(bookId);
    if (!book) {
      return sendError(res, 'Book not found', 404);
    }
    if (book.available <= 0) {
      return sendError(res, 'No copies of this book are currently available', 400);
    }

    // Decrement available copies
    book.available -= 1;
    await book.save();

    const newIssue = await Issue.create({
      book: bookId,
      user: userId,
      dueDate,
      status: 'Issued'
    });

    const populated = await Issue.findById(newIssue._id)
      .populate('book', 'title author isbn category')
      .populate('user', 'name email phone');

    return sendSuccess(res, 'Book issued successfully', populated, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Return a book (mark issue as returned)
// @route   PUT /api/issues/:id/return
export const returnIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return sendError(res, 'Issue record not found', 404);
    }
    if (issue.status === 'Returned') {
      return sendError(res, 'This book has already been returned', 400);
    }

    // Mark as returned
    issue.status = 'Returned';
    issue.returnDate = new Date();
    await issue.save();

    // Restore available copies on the book
    const book = await Book.findById(issue.book);
    if (book) {
      book.available += 1;
      await book.save();
    }

    const populated = await Issue.findById(issue._id)
      .populate('book', 'title author isbn category')
      .populate('user', 'name email phone');

    return sendSuccess(res, 'Book returned successfully', populated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an issue record
// @route   DELETE /api/issues/:id
export const deleteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) {
      return sendError(res, 'Issue not found', 404);
    }
    return sendSuccess(res, 'Issue record deleted successfully');
  } catch (error) {
    next(error);
  }
};
