"use client"

import { useState, useEffect, useCallback, lazy, Suspense } from "react"
import { books } from "../../data/mockData"
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import Loading from "../../components/Loading/Loading"
import styles from "./Books.module.css"

// Lazy load BookCard for better performance
const BookCard = lazy(() => import("../../components/BookCard/BookCard"))

const Books = () => {
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  // Simulate loading delay for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filterBooks = useCallback(() => {
    let filtered = books

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.includes(searchTerm),
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "All Categories") {
      filtered = filtered.filter((book) => book.category === selectedCategory)
    }

    setFilteredBooks(filtered)
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    filterBooks()
  }, [filterBooks])

  const handleSearch = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  const handleFilter = useCallback((category) => {
    setSelectedCategory(category)
  }, [])

  if (loading) {
    return <Loading text="Loading books..." />
  }

  return (
    <main className={styles.booksPage}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>School Library Catalog</h1>
        <p className={styles.pageDescription}>
          Discover and explore our collection of books. Use the search and filter options to find exactly what you're
          looking for.
        </p>
      </header>

      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} totalResults={filteredBooks.length} />

      <div id="main-content">
        {filteredBooks.length > 0 ? (
          <div className={styles.booksGrid} role="grid" aria-label="Books catalog">
            <Suspense fallback={<Loading text="Loading book cards..." />}>
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className={styles.noResults} role="status">
            <h2 className={styles.noResultsTitle}>No books found</h2>
            <p className={styles.noResultsText}>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Books
