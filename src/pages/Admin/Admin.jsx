"use client"

import { useState, useEffect } from "react"
import { books as initialBooks, categories } from "../../data/mockData"
import Loading from "../../components/Loading/Loading"
import styles from "./Admin.module.css"

const Admin = () => {
  const [books, setBooks] = useState(initialBooks)
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: categories[1], // Skip "All Categories"
    description: "",
    publishedYear: "",
    totalCopies: 1,
  })

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBook = {
      id: Math.max(...books.map((b) => b.id)) + 1,
      ...formData,
      publishedYear: Number.parseInt(formData.publishedYear),
      totalCopies: Number.parseInt(formData.totalCopies),
      availableCopies: Number.parseInt(formData.totalCopies),
      available: true,
      coverImage: `/placeholder.svg?height=300&width=200&query=${encodeURIComponent(formData.title + " book cover")}`,
    }

    setBooks((prev) => [...prev, newBook])
    setSuccessMessage(`"${formData.title}" has been added to the library!`)

    // Reset form
    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: categories[1],
      description: "",
      publishedYear: "",
      totalCopies: 1,
    })

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleDeleteBook = (bookId) => {
    const bookToDelete = books.find((b) => b.id === bookId)
    if (window.confirm(`Are you sure you want to delete "${bookToDelete.title}"?`)) {
      setBooks((prev) => prev.filter((b) => b.id !== bookId))
      setSuccessMessage(`"${bookToDelete.title}" has been removed from the library.`)
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  if (loading) {
    return <Loading text="Loading admin panel..." />
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Admin Panel</h1>
        <p className={styles.pageDescription}>
          Manage the library catalog by adding new books or removing existing ones.
        </p>
      </header>

      {successMessage && (
        <div className={styles.successMessage} role="alert">
          {successMessage}
        </div>
      )}

      <div className={styles.adminGrid}>
        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Add New Book</h2>
          </header>
          <div className={styles.sectionContent}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                  Book Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  aria-describedby="title-help"
                />
                <div id="title-help" className="sr-only">
                  Enter the full title of the book
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="author" className={styles.label}>
                  Author *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="isbn" className={styles.label}>
                  ISBN *
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  placeholder="978-0-123456-78-9"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.label}>
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.select}
                  required
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="publishedYear" className={styles.label}>
                  Published Year *
                </label>
                <input
                  type="number"
                  id="publishedYear"
                  name="publishedYear"
                  value={formData.publishedYear}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  min="1000"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="totalCopies" className={styles.label}>
                  Number of Copies *
                </label>
                <input
                  type="number"
                  id="totalCopies"
                  name="totalCopies"
                  value={formData.totalCopies}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  min="1"
                  max="50"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  required
                  placeholder="Enter a brief description of the book..."
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Add Book to Library
              </button>
            </form>
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Manage Books ({books.length})</h2>
          </header>
          <div className={styles.sectionContent}>
            <div className={styles.booksList}>
              {books.map((book) => (
                <div key={book.id} className={styles.bookItem}>
                  <div className={styles.bookItemInfo}>
                    <h3 className={styles.bookItemTitle}>{book.title}</h3>
                    <p className={styles.bookItemAuthor}>by {book.author}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className={styles.deleteButton}
                    aria-label={`Delete ${book.title}`}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Admin
