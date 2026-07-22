import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const [b, m, i] = await Promise.all([
        api.getBooks(),
        api.getMembers(),
        api.getIssues(),
      ]);
      setBooks(b);
      setMembers(m);
      setIssues(i);
      setLoading(false);
    };
    loadData();
  }, []);

  // Persist whenever state changes
  useEffect(() => { if (!loading) api.saveBooks(books); }, [books, loading]);
  useEffect(() => { if (!loading) api.saveMembers(members); }, [members, loading]);
  useEffect(() => { if (!loading) api.saveIssues(issues); }, [issues, loading]);

  // --- Book handlers ---
  const addBook = (book) => setBooks((prev) => [...prev, book]);

  const editBook = (updated) =>
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));

  const deleteBook = (id) =>
    setBooks((prev) => prev.filter((b) => b.id !== id));

  // --- Member handlers ---
  const addMember = (member) => setMembers((prev) => [...prev, member]);

  const editMember = (updated) =>
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));

  const deleteMember = (id) =>
    setMembers((prev) => prev.filter((m) => m.id !== id));

  // --- Issue/Return handlers ---
  const issueBook = (newIssue) => {
    // Decrement book available copies
    setBooks((prev) =>
      prev.map((b) =>
        b.id === newIssue.bookId ? { ...b, copies: b.copies - 1 } : b
      )
    );
    setIssues((prev) => [...prev, newIssue]);
  };

  const returnBook = (issueId) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;
    // Restore the copy
    setBooks((prev) =>
      prev.map((b) =>
        b.id === issue.bookId ? { ...b, copies: b.copies + 1 } : b
      )
    );
    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId
          ? { ...i, status: 'Returned', returnDate: new Date().toISOString().split('T')[0] }
          : i
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        books,
        members,
        issues,
        loading,
        addBook,
        editBook,
        deleteBook,
        addMember,
        editMember,
        deleteMember,
        issueBook,
        returnBook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
