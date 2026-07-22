import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// Fallback mock data (used only when the backend is unreachable)
const fallbackBooks = [
  { id: 'BK101', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', copies: 4, totalCopies: 5 },
  { id: 'BK102', title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', copies: 2, totalCopies: 3 },
];
const fallbackMembers = [
  { id: 'MEM001', name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
];
const fallbackIssues = [];

const getStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
};

/**
 * Normalise a backend Book document → frontend shape.
 * Backend uses { _id, title, author, isbn, category, quantity, available }
 * Frontend uses { id, title, author, isbn, category, copies, totalCopies }
 */
const normaliseBook = (doc) => ({
  id: doc._id || doc.id,
  title: doc.title,
  author: doc.author,
  isbn: doc.isbn || '',
  category: doc.category,
  copies: doc.available !== undefined ? doc.available : (doc.copies ?? 0),
  totalCopies: doc.quantity !== undefined ? doc.quantity : (doc.totalCopies ?? 0),
});

/**
 * Normalise a backend User document → frontend "member" shape.
 * Backend uses { _id, name, email, phone, role }
 * Frontend uses { id, name, email, phone }
 */
const normaliseMember = (doc) => ({
  id: doc._id || doc.id,
  name: doc.name,
  email: doc.email,
  phone: doc.phone || '',
});

/**
 * Normalise a backend Issue document → frontend shape.
 * Backend returns populated { _id, book: { _id, title }, user: { _id, name }, ... }
 * Frontend uses { id, bookId, bookTitle, memberId, memberName, issueDate, dueDate, returnDate, status }
 */
const normaliseIssue = (doc) => ({
  id: doc._id || doc.id,
  bookId: doc.book?._id || doc.book || doc.bookId,
  bookTitle: doc.book?.title || doc.bookTitle || '',
  memberId: doc.user?._id || doc.user || doc.memberId,
  memberName: doc.user?.name || doc.memberName || '',
  issueDate: doc.issueDate ? new Date(doc.issueDate).toISOString().split('T')[0] : '',
  dueDate: doc.dueDate ? new Date(doc.dueDate).toISOString().split('T')[0] : '',
  returnDate: doc.returnDate ? new Date(doc.returnDate).toISOString().split('T')[0] : null,
  status: doc.status || 'Issued',
});

// ─── BOOKS ──────────────────────────────────────────────────

export const bookApi = {
  getAll: async () => {
    try {
      const res = await client.get('/books');
      return (res.data.data || []).map(normaliseBook);
    } catch {
      return getStorage('lms_books', fallbackBooks);
    }
  },

  create: async (bookData) => {
    try {
      const res = await client.post('/books', {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        category: bookData.category,
        quantity: parseInt(bookData.copies, 10) || 1,
        available: parseInt(bookData.copies, 10) || 1,
      });
      return normaliseBook(res.data.data);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create book');
    }
  },

  update: async (id, bookData) => {
    try {
      const res = await client.put(`/books/${id}`, {
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        category: bookData.category,
        quantity: parseInt(bookData.totalCopies, 10) || undefined,
        available: parseInt(bookData.copies, 10) || undefined,
      });
      return normaliseBook(res.data.data);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update book');
    }
  },

  delete: async (id) => {
    try {
      await client.delete(`/books/${id}`);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete book');
    }
  },
};

// ─── MEMBERS (backend: /api/users) ──────────────────────────

export const memberApi = {
  getAll: async () => {
    try {
      const res = await client.get('/users');
      return (res.data.data || []).map(normaliseMember);
    } catch {
      return getStorage('lms_members', fallbackMembers);
    }
  },

  create: async (memberData) => {
    try {
      const res = await client.post('/users', {
        name: memberData.name,
        email: memberData.email,
        phone: memberData.phone,
        role: 'student',
      });
      return normaliseMember(res.data.data);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create member');
    }
  },

  update: async (id, memberData) => {
    try {
      const res = await client.put(`/users/${id}`, {
        name: memberData.name,
        email: memberData.email,
        phone: memberData.phone,
      });
      return normaliseMember(res.data.data);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update member');
    }
  },

  delete: async (id) => {
    try {
      await client.delete(`/users/${id}`);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete member');
    }
  },
};

// ─── ISSUES ─────────────────────────────────────────────────

export const issueApi = {
  getAll: async () => {
    try {
      const res = await client.get('/issues');
      return (res.data.data || []).map(normaliseIssue);
    } catch {
      return getStorage('lms_issues', fallbackIssues);
    }
  },

  create: async (issueData) => {
    try {
      const res = await client.post('/issues', {
        book: issueData.bookId,
        user: issueData.memberId,
        dueDate: issueData.dueDate,
      });
      return normaliseIssue(res.data.data);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to issue book');
    }
  },

  return: async (id) => {
    try {
      const res = await client.put(`/issues/${id}/return`);
      return normaliseIssue(res.data.data);
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to return book');
    }
  },
};

// Legacy compat — keep the old `api` export so any stray imports don't crash
export const api = {
  getBooks: bookApi.getAll,
  getMembers: memberApi.getAll,
  getIssues: issueApi.getAll,
  saveBooks: () => {},
  saveMembers: () => {},
  saveIssues: () => {},
};
