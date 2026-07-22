import React from 'react';

export default function Dashboard({ books, members, issues, onNavigate, onOpenModal }) {
  const totalBooks = books.reduce((acc, b) => acc + (b.totalCopies || b.copies || 1), 0);
  const booksAvailable = books.reduce((acc, b) => acc + (b.copies || 0), 0);
  const totalMembers = members.length;
  const booksIssued = issues.filter(i => i.status === 'Issued').length;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here is what's happening in your library today.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={() => onOpenModal('addBook')}>
            + Add Book
          </button>
          <button className="btn-secondary" onClick={() => onOpenModal('addMember')}>
            + Add Member
          </button>
          <button className="btn-primary" onClick={() => onNavigate('issueReturn')}>
            Issue Book
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon books">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div className="stat-details">
            <h3>Total Books</h3>
            <div className="stat-number">{totalBooks}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon members">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-details">
            <h3>Total Members</h3>
            <div className="stat-number">{totalMembers}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon issued">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          </div>
          <div className="stat-details">
            <h3>Books Issued</h3>
            <div className="stat-number">{booksIssued}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon available">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="stat-details">
            <h3>Books Available</h3>
            <div className="stat-number">{booksAvailable}</div>
          </div>
        </div>
      </div>

      {/* Quick Action Cards Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Quick Actions</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Perform common administrative tasks in one click.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn-secondary" style={{ justifyContent: 'flex-start' }} onClick={() => onOpenModal('addBook')}>
              📖 Add a New Book
            </button>
            <button className="btn-secondary" style={{ justifyContent: 'flex-start' }} onClick={() => onOpenModal('addMember')}>
              👤 Register New Member
            </button>
            <button className="btn-secondary" style={{ justifyContent: 'flex-start' }} onClick={() => onNavigate('issueReturn')}>
              🔄 Issue or Return Book
            </button>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Recent Book Issues</h3>
            <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }} onClick={() => onNavigate('issueReturn')}>
              View All
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Book</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {issues.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No books currently issued.</td>
                  </tr>
                ) : (
                  issues.slice(0, 4).map((issue) => (
                    <tr key={issue.id}>
                      <td style={{ fontWeight: '600' }}>{issue.memberName}</td>
                      <td>{issue.bookTitle}</td>
                      <td>{issue.issueDate}</td>
                      <td>{issue.dueDate}</td>
                      <td>
                        <span className={`badge ${issue.status === 'Issued' ? 'badge-amber' : 'badge-emerald'}`}>
                          {issue.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
