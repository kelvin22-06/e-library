"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { books } from "../../data/mockData"
import Loading from "../../components/Loading/Loading"
import styles from "./BookDetail.module.css"

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundBook = books.find((b) => b.id === Number.parseInt(id))
      setBook(foundBook)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [id])

  const handleBorrow = () => {
    alert("Borrow functionality would be implemented with backend integration")
  }

  const handleReserve = () => {
    alert("Reserve functionality would be implemented with backend integration")
  }

  if (loading) {
    return <Loading text="Loading book details..." />
  }

  if (!book) {
    return (
      <main className={styles.bookDetailPage}>
        <div className={styles.noResults}>
          <h1>Book not found</h1>
          <p>The book you're looking for doesn't exist.</p>
          <Link to="/" className={styles.backButton}>
            ← Back to Books
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.bookDetailPage}>
      <Link to="/" className={styles.backButton} aria-label="Go back to books list">
        ← Back to Books
      </Link>

      <article className={styles.bookDetailContainer}>
        <div className={styles.bookDetailGrid}>
          <section className={styles.imageSection}>
            <img
              src={book.coverImage || "/placeholder.svg"}
              alt={`Cover of ${book.title}`}
              className={styles.bookImage}
            />
            <div className={`${styles.availabilityStatus} ${book.available ? styles.available : styles.unavailable}`}>
              <span
                className={`${styles.statusIcon} ${book.available ? styles.available : styles.unavailable}`}
                aria-hidden="true"
              ></span>
              {book.available ? "Available" : "Not Available"}
            </div>
          </section>

          <section className={styles.contentSection}>
            <header>
              <h1 className={styles.bookTitle}>{book.title}</h1>
              <p className={styles.bookAuthor}>by {book.author}</p>
            </header>

            <div className={styles.bookMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>ISBN</span>
                <span className={styles.metaValue}>{book.isbn}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Category</span>
                <span className={`${styles.metaValue} ${styles.category}`}>{book.category}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Published Year</span>
                <span className={styles.metaValue}>{book.publishedYear}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Availability</span>
                <span className={styles.metaValue}>
                  {book.availableCopies} of {book.totalCopies} copies available
                </span>
              </div>
            </div>

            <div className={styles.description}>
              <p>{book.description}</p>
            </div>

            <div className={styles.actionButtons}>
              {book.available ? (
                <button onClick={handleBorrow} className={styles.borrowButton} aria-describedby="borrow-help">
                  Borrow Book
                </button>
              ) : (
                <button onClick={handleBorrow} disabled className={styles.borrowButton} aria-describedby="borrow-help">
                  Currently Unavailable
                </button>
              )}
              <button onClick={handleReserve} className={styles.reserveButton} aria-describedby="reserve-help">
                Reserve Book
              </button>
            </div>

            <div id="borrow-help" className="sr-only">
              {book.available
                ? "Click to borrow this book. You will need to sign in to complete the transaction."
                : "This book is currently not available for borrowing."}
            </div>
            <div id="reserve-help" className="sr-only">
              Click to reserve this book. You will be notified when it becomes available.
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}

export default BookDetail
