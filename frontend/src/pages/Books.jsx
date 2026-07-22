import React, { useState } from 'react';

export default function Books({ books, onAddBook, onEditBook, onDeleteBook }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    copies: 1
  });

  const filteredBooks = books.filter((book) => {
    const term = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term) ||
      book.id.toLowerCase().includes(term)
    );
  });

  const handleOpenAddModal = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '', category: 'Fiction', copies: 1 });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      copies: book.copies !== undefined ? book.copies : 1
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;

    if (editingBook) {
      onEditBook({
        ...editingBook,
        title: formData.title,
        author: formData.author,
        category: formData.category,
        copies: parseInt(formData.copies, 10)
      });
    } else {
      const newBook = {
        id: `BK${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title,
        author: formData.author,
        category: formData.category,
        copies: parseInt(formData.copies, 10),
        totalCopies: parseInt(formData.copies, 10)
      };
      onAddBook(newBook);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Book Management</h1>
          <p>Catalog, update, and organize library book inventory.</p>
        </div>
        <button className="btn-primary" onClick={handleOpenAddModal}>
          + Add New Book
        </button>
      </div>

      {/* Search & Actions Bar */}
      <div className="actions-bar">
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by Title, Author, Category, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing {filteredBooks.length} of {books.length} Books
        </div>
      </div>

      {/* Book Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Available Copies</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  No books found matching "{searchTerm}".
                </td>
              </tr>
            ) : (
              filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td style={{ fontWeight: '600', color: 'var(--accent-sky)' }}>{book.id}</td>
                  <td style={{ fontWeight: '600' }}>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <span className="badge badge-sky">{book.category}</span>
                  </td>
                  <td>{book.copies !== undefined ? book.copies : 0}</td>
                  <td>
                    {book.copies > 0 ? (
                      <span className="badge badge-emerald">Available</span>
                    ) : (
                      <span className="badge badge-rose">Out of Stock</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="btn-icon edit" title="Edit Book" onClick={() => handleOpenEditModal(book)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="btn-icon delete" title="Delete Book" onClick={() => onDeleteBook(book.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Book Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingBook ? 'Edit Book Details' : 'Add New Book'}</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Book Title</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Clean Architecture"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Robert C. Martin"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Technology">Technology</option>
                    <option value="Classic">Classic</option>
                    <option value="Software">Software</option>
                    <option value="Science">Science</option>
                    <option value="Self-Help">Self-Help</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Available Copies</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    required
                    value={formData.copies}
                    onChange={(e) => setFormData({ ...formData, copies: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingBook ? 'Save Changes' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
