import "./BookCard.css";

function BookCard({ book, onEdit, onDelete, onIssue }) {
  const isAvailable = book?.status === "Available";

  return (
    <div className="book-card">
      <div className="book-spine"></div>

      <div className="book-content">
        <span
          className={`book-status ${
            isAvailable ? "status-available" : "status-issued"
          }`}
        >
          {book?.status || "Unknown"}
        </span>

        <h3 className="book-title">{book?.title || "Untitled Book"}</h3>

        <p className="book-author">
          by {book?.author || "Unknown Author"}
        </p>

        <p className="book-category">
          {book?.category || "General"}
        </p>

        <div className="book-actions">
          <button
            type="button"
            className="btn btn-edit"
            onClick={() => onEdit(book)}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-delete"
            onClick={() => onDelete(book.id)}
          >
            Delete
          </button>

          <button
            type="button"
            className="btn btn-issue"
            disabled={!isAvailable}
            onClick={() => onIssue(book)}
          >
            {isAvailable ? "Issue" : "Issued"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;