import React from 'react';

export default function Navbar({ activePage, setActivePage, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand" style={{ cursor: 'pointer' }} onClick={() => setActivePage('home')}>
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        </div>
        <span>LibManager</span>
      </div>

      <nav>
        <ul className="nav-links">
          <li className="nav-item">
            <button
              className={activePage === 'home' ? 'active' : ''}
              onClick={() => setActivePage('home')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className={activePage === 'dashboard' ? 'active' : ''}
              onClick={() => setActivePage('dashboard')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className={activePage === 'books' ? 'active' : ''}
              onClick={() => setActivePage('books')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Books
            </button>
          </li>
          <li className="nav-item">
            <button
              className={activePage === 'members' ? 'active' : ''}
              onClick={() => setActivePage('members')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
              </svg>
              Members
            </button>
          </li>
          <li className="nav-item">
            <button
              className={activePage === 'issueReturn' ? 'active' : ''}
              onClick={() => setActivePage('issueReturn')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
              Issue & Return
            </button>
          </li>
        </ul>
      </nav>

      <div className="user-profile">
        <div className="user-info">
          <div className="user-name">{user?.username || 'Admin'}</div>
          <div className="user-role">{user?.role || 'Librarian'}</div>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
