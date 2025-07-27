"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { borrowedBooks } from "../../data/mockData"
import Loading from "../../components/Loading/Loading"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const [userBooks, setUserBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setUserBooks(borrowedBooks)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = (dueDateString) => {
    return new Date(dueDateString) < new Date()
  }

  const overdueCount = userBooks.filter((book) => isOverdue(book.dueDate)).length
  const totalBorrowed = userBooks.length

  if (loading) {
    return <Loading text="Loading your dashboard..." />
  }

  return (
    <main className={styles.dashboardPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Dashboard</h1>
        <p className={styles.welcomeMessage}>Welcome back! Here's an overview of your library activity.</p>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Currently Borrowed Books</h2>
            </header>
            <div className={styles.sectionContent}>
              {userBooks.length > 0 ? (
                <div className={styles.borrowedBooksList}>
                  {userBooks.map((book) => (
                    <article key={book.id} className={styles.borrowedBookItem}>
                      <img
                        src={book.coverImage || "/placeholder.svg"}
                        alt={`Cover of ${book.title}`}
                        className={styles.bookThumbnail}
                        loading="lazy"
                      />
                      <div className={styles.bookInfo}>
                        <h3 className={styles.bookTitle}>{book.title}</h3>
                        <p className={styles.bookAuthor}>by {book.author}</p>
                        <div className={styles.bookDates}>
                          <div className={styles.dateInfo}>
                            <span className={styles.dateLabel}>Borrowed:</span>
                            <span className={styles.dateValue}>{formatDate(book.borrowDate)}</span>
                          </div>
                          <div className={styles.dateInfo}>
                            <span className={styles.dateLabel}>Due:</span>
                            <span className={`${styles.dateValue} ${isOverdue(book.dueDate) ? styles.overdue : ""}`}>
                              {formatDate(book.dueDate)}
                              {isOverdue(book.dueDate) && " (Overdue)"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <h3 className={styles.emptyStateTitle}>No borrowed books</h3>
                  <p>You haven't borrowed any books yet. Browse our catalog to get started!</p>
                  <Link
                    to="/"
                    className={styles.actionButton}
                    style={{ marginTop: "var(--spacing-md)", display: "inline-block" }}
                  >
                    Browse Books
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Quick Stats</h2>
            </header>
            <div className={styles.sectionContent}>
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{totalBorrowed}</span>
                  <span className={styles.statLabel}>Books Borrowed</span>
                </div>
                <div className={styles.statItem}>
                  <span className={`${styles.statNumber} ${overdueCount > 0 ? styles.overdue : ""}`}>
                    {overdueCount}
                  </span>
                  <span className={styles.statLabel}>Overdue</span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
            </header>
            <div className={styles.sectionContent}>
              <div className={styles.quickActions}>
                <Link to="/" className={styles.actionButton}>
                  Browse Catalog
                </Link>
                <button
                  className={`${styles.actionButton} ${styles.secondary}`}
                  onClick={() => alert("Renew functionality would be implemented with backend")}
                >
                  Renew Books
                </button>
                <button
                  className={`${styles.actionButton} ${styles.secondary}`}
                  onClick={() => alert("History functionality would be implemented with backend")}
                >
                  View History
                </button>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}

export default Dashboard
