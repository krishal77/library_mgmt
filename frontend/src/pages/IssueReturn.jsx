import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function IssueReturn() {
  const { books, members, issues, issueBook, returnBook } = useAppContext();

  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedBookId, setSelectedBookId] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const defaultDue = new Date();
    defaultDue.setDate(defaultDue.getDate() + 14);
    return defaultDue.toISOString().split('T')[0];
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const availableBooks = books.filter((b) => b.copies > 0);

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    if (!selectedMemberId || !selectedBookId) {
      setErrorMsg('Please select both a member and an available book.');
      setSuccessMsg('');
      return;
    }

    const member = members.find((m) => m.id === selectedMemberId);
    const book = books.find((b) => b.id === selectedBookId);

    if (!book || book.copies <= 0) {
      setErrorMsg('Selected book is out of stock!');
      setSuccessMsg('');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newIssue = {
      id: `ISS${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: member.id,
      memberName: member.name,
      bookId: book.id,
      bookTitle: book.title,
      issueDate: today,
      dueDate: dueDate,
      returnDate: null,
      status: 'Issued',
    };

    issueBook(newIssue);
    setSelectedMemberId('');
    setSelectedBookId('');
    setErrorMsg('');
    setSuccessMsg(`"${book.title}" successfully issued to ${member.name}.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Issue &amp; Return Books</h1>
          <p>Process book lending transactions and track return status.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Form Card for Issuing Book */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Issue a Book</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Select member and an available title from the library inventory.
          </p>

          {errorMsg && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              ✅ {successMsg}
            </div>
          )}

          <form onSubmit={handleIssueSubmit}>
            <div className="form-group">
              <label>Select Member</label>
              <select
                className="form-control"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                required
              >
                <option value="">-- Choose Member --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Select Book</label>
              <select
                className="form-control"
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                required
              >
                <option value="">-- Choose Book --</option>
                {availableBooks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} (Available: {b.copies})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              🔄 Confirm &amp; Issue Book
            </button>
          </form>
        </div>

        {/* Info box / instructions */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ color: '#818cf8', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Lending Rules &amp; Policy</h3>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '1.7' }}>
            <li>Standard borrowing duration is set to 14 days by default.</li>
            <li>Members cannot borrow copies of books with zero available stock.</li>
            <li>Returning an issued book automatically restores available copies in Book Management.</li>
            <li>All transactions update real-time statistics on the main Dashboard.</li>
          </ul>
        </div>
      </div>

      {/* Issued Books Table */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Current Book Issue Log</h2>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Issue ID</th>
              <th>Member Name</th>
              <th>Book Title</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  No book issues recorded yet.
                </td>
              </tr>
            ) : (
              issues.map((issue) => (
                <tr key={issue.id}>
                  <td style={{ fontWeight: '600', color: 'var(--accent-sky)' }}>{issue.id}</td>
                  <td style={{ fontWeight: '600' }}>{issue.memberName}</td>
                  <td>{issue.bookTitle}</td>
                  <td>{issue.issueDate}</td>
                  <td>{issue.dueDate}</td>
                  <td>
                    <span className={`badge ${issue.status === 'Issued' ? 'badge-amber' : 'badge-emerald'}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {issue.status === 'Issued' ? (
                      <button
                        className="btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                        onClick={() => returnBook(issue.id)}
                      >
                        Return Book
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Returned ({issue.returnDate})
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
