import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { bookApi, memberApi, issueApi } from '../services/api';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─── Load data from the backend on mount ──────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        const [b, m, i] = await Promise.all([
          bookApi.getAll(),
          memberApi.getAll(),
          issueApi.getAll(),
        ]);
        setBooks(b);
        setMembers(m);
        setIssues(i);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ─── Book handlers (real API calls) ───────────────────────

  const addBook = useCallback(async (bookData) => {
    const newBook = await bookApi.create(bookData);
    setBooks((prev) => [newBook, ...prev]);
    return newBook;
  }, []);

  const editBook = useCallback(async (updated) => {
    const saved = await bookApi.update(updated.id, updated);
    setBooks((prev) => prev.map((b) => (b.id === saved.id ? saved : b)));
    return saved;
  }, []);

  const deleteBook = useCallback(async (id) => {
    await bookApi.delete(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // ─── Member handlers (real API calls) ─────────────────────

  const addMember = useCallback(async (memberData) => {
    const newMember = await memberApi.create(memberData);
    setMembers((prev) => [newMember, ...prev]);
    return newMember;
  }, []);

  const editMember = useCallback(async (updated) => {
    const saved = await memberApi.update(updated.id, updated);
    setMembers((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));
    return saved;
  }, []);

  const deleteMember = useCallback(async (id) => {
    await memberApi.delete(id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ─── Issue/Return handlers (real API calls) ───────────────

  const issueBook = useCallback(async (issueData) => {
    const newIssue = await issueApi.create(issueData);
    setIssues((prev) => [newIssue, ...prev]);
    // Refresh books to get updated available counts from DB
    const freshBooks = await bookApi.getAll();
    setBooks(freshBooks);
    return newIssue;
  }, []);

  const returnBook = useCallback(async (issueId) => {
    const updated = await issueApi.return(issueId);
    setIssues((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    // Refresh books to get restored available counts from DB
    const freshBooks = await bookApi.getAll();
    setBooks(freshBooks);
    return updated;
  }, []);

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
