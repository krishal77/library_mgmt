import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Members from './pages/Members';
import IssueReturn from './pages/IssueReturn';
import { api } from './services/api';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('lms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activePage, setActivePage] = useState('dashboard');
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [issues, setIssues] = useState([]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      const booksData = await api.getBooks();
      const membersData = await api.getMembers();
      const issuesData = await api.getIssues();

      setBooks(booksData);
      setMembers(membersData);
      setIssues(issuesData);
    };
    loadData();
  }, []);

  // Save changes to storage whenever state updates
  useEffect(() => {
    if (books.length > 0) api.saveBooks(books);
  }, [books]);

  useEffect(() => {
    if (members.length > 0) api.saveMembers(members);
  }, [members]);

  useEffect(() => {
    if (issues.length > 0) api.saveIssues(issues);
  }, [issues]);

  // Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('lms_user', JSON.stringify(userData));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  // Book Handlers
  const handleAddBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleEditBook = (updatedBook) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    }
  };

  // Member Handlers
  const handleAddMember = (newMember) => {
    setMembers((prev) => [newMember, ...prev]);
  };

  const handleEditMember = (updatedMember) => {
    setMembers((prev) => prev.map((m) => (m.id === updatedMember.id ? updatedMember : m)));
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    }
  };

  // Issue & Return Handlers
  const handleIssueBook = (newIssue) => {
    setIssues((prev) => [newIssue, ...prev]);
    // Decrement available copies of the book
    setBooks((prev) =>
      prev.map((b) =>
        b.id === newIssue.bookId
          ? { ...b, copies: Math.max(0, (b.copies || 1) - 1) }
          : b
      )
    );
  };

  const handleReturnBook = (issueId) => {
    const issueToReturn = issues.find((i) => i.id === issueId);
    if (!issueToReturn) return;

    const today = new Date().toISOString().split('T')[0];

    setIssues((prev) =>
      prev.map((i) =>
        i.id === issueId
          ? { ...i, status: 'Returned', returnDate: today }
          : i
      )
    );

    // Increment available copies of the book
    setBooks((prev) =>
      prev.map((b) =>
        b.id === issueToReturn.bookId
          ? { ...b, copies: (b.copies || 0) + 1 }
          : b
      )
    );
  };

  const handleOpenModal = (modalType) => {
    if (modalType === 'addBook') {
      setActivePage('books');
    } else if (modalType === 'addMember') {
      setActivePage('members');
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        user={user}
        onLogout={handleLogout}
      />

      <main className="page-content">
        {activePage === 'home' && (
          <Home
            onGetStarted={() => setActivePage('dashboard')}
            onLoginClick={() => setActivePage('dashboard')}
            user={user}
          />
        )}

        {activePage === 'dashboard' && (
          <Dashboard
            books={books}
            members={members}
            issues={issues}
            onNavigate={setActivePage}
            onOpenModal={handleOpenModal}
          />
        )}

        {activePage === 'books' && (
          <Books
            books={books}
            onAddBook={handleAddBook}
            onEditBook={handleEditBook}
            onDeleteBook={handleDeleteBook}
          />
        )}

        {activePage === 'members' && (
          <Members
            members={members}
            onAddMember={handleAddMember}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
          />
        )}

        {activePage === 'issueReturn' && (
          <IssueReturn
            books={books}
            members={members}
            issues={issues}
            onIssueBook={handleIssueBook}
            onReturnBook={handleReturnBook}
          />
        )}
      </main>
    </div>
  );
}
