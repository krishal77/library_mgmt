import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [active, setActive] = useState('dashboard');

  const links = [
    { id: 'dashboard', label: 'Dashboard', href: '/' },
    { id: 'books', label: 'Books', href: '/books' },
    { id: 'members', label: 'Members', href: '/members' },
    { id: 'issues', label: 'Issue & Return', href: '/issues' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">📖</span>
        <span className="navbar-title">
          Book<em>Nook</em>
        </span>
      </div>

      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className={`navbar-link ${active === link.id ? 'active' : ''}`}
              onClick={() => setActive(link.id)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button className="navbar-login">Login</button>
    </nav>
  );
}

export default Navbar;