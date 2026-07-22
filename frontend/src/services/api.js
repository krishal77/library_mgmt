import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

// Initial Mock Seed Data for standalone frontend demo
const initialBooks = [
  { id: 'BK101', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', copies: 4, totalCopies: 5 },
  { id: 'BK102', title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', copies: 2, totalCopies: 3 },
  { id: 'BK103', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic', copies: 0, totalCopies: 2 },
  { id: 'BK104', title: 'Design Patterns', author: 'Erich Gamma et al.', category: 'Software', copies: 3, totalCopies: 3 },
  { id: 'BK105', title: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', copies: 5, totalCopies: 6 }
];

const initialMembers = [
  { id: 'MEM001', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234 567 8901' },
  { id: 'MEM002', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+1 987 654 3210' },
  { id: 'MEM003', name: 'Alex Rivera', email: 'alex.r@example.com', phone: '+1 555 123 4567' }
];

const initialIssues = [
  { id: 'ISS1001', memberId: 'MEM001', memberName: 'John Doe', bookId: 'BK101', bookTitle: 'The Great Gatsby', issueDate: '2026-07-15', dueDate: '2026-07-29', returnDate: null, status: 'Issued' },
  { id: 'ISS1002', memberId: 'MEM002', memberName: 'Sarah Jenkins', bookId: 'BK103', bookTitle: 'To Kill a Mockingbird', issueDate: '2026-07-10', dueDate: '2026-07-24', returnDate: null, status: 'Issued' }
];

// Helper for Local Storage persistence
const getStorageItem = (key, fallback) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
};

const setStorageItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  // Books API
  getBooks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data;
    } catch {
      return getStorageItem('lms_books', initialBooks);
    }
  },
  saveBooks: (books) => setStorageItem('lms_books', books),

  // Members API
  getMembers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/members`);
      return response.data;
    } catch {
      return getStorageItem('lms_members', initialMembers);
    }
  },
  saveMembers: (members) => setStorageItem('lms_members', members),

  // Issues API
  getIssues: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/issues`);
      return response.data;
    } catch {
      return getStorageItem('lms_issues', initialIssues);
    }
  },
  saveIssues: (issues) => setStorageItem('lms_issues', issues),
};
