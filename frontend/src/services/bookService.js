import { api } from './api';

const bookService = {
  getAll: () => api.getBooks(),
  save: (books) => api.saveBooks(books),
};

export default bookService;
