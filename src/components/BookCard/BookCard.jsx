import { Link } from "react-router-dom"
import styles from "./BookCard.module.css"

const BookCard = ({ book }) => {
  return (
    <article className={styles.bookCard}>
      <div className={styles.imageContainer}>
        <img
          src={book.coverImage || "/placeholder.svg"}
          alt={`Cover of ${book.title}`}
          className={styles.bookImage}
          loading="lazy"
        />
        <span
          className={`${styles.availabilityBadge} ${book.available ? styles.available : styles.unavailable}`}
          aria-label={book.available ? "Available" : "Not available"}
        >
          {book.available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.bookTitle}>{book.title}</h3>
        <p className={styles.bookAuthor}>by {book.author}</p>
        <span className={styles.bookCategory}>{book.category}</span>
        <p className={styles.bookDescription}>{book.description}</p>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.copiesInfo}>
          {book.availableCopies} of {book.totalCopies} available
        </span>
        <Link to={`/book/${book.id}`} className={styles.viewButton} aria-label={`View details for ${book.title}`}>
          View Details
        </Link>
      </div>
    </article>
  )
}

export default BookCard
