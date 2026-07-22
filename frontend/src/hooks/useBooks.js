import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Custom React hook for fetching and managing books state.
 * Falls back to localStorage/mock data if the backend is unavailable.
 */
const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await api.getBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const saveBooks = (updated) => {
    setBooks(updated);
    api.saveBooks(updated);
  };

  return { books, setBooks: saveBooks, loading, error };
};

export default useBooks;
