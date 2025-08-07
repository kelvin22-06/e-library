"use client"

import { useState, useEffect } from "react"
import { categories } from "../../data/mockData"
import styles from "./SearchFilter.module.css"

const SearchFilter = ({ onSearch, onFilter, totalResults }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  useEffect(() => {
    onSearch(searchTerm)
  }, [searchTerm, onSearch])

  useEffect(() => {
    onFilter(selectedCategory)
  }, [selectedCategory, onFilter])

  const handleClear = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
  }

  const hasFilters = searchTerm || selectedCategory !== "All Categories"

  return (
    <section className={styles.searchFilterContainer} aria-label="Search and filter books">
      <div className={styles.searchFilterGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="search-input" className={styles.label}>
            Search Books
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className= "text-black"
            aria-describedby="search-help"
          />
          <div id="search-help" className="sr-only">
            Search books by title, author, or ISBN number
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category-filter" className={styles.label}>
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-black"
            aria-describedby="filter-help"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div id="filter-help" className="sr-only">
            Filter books by category
          </div>
        </div>

        <button
          onClick={handleClear}
          disabled={!hasFilters}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      </div>

      {totalResults !== undefined && (
        <div className={styles.resultsCount} aria-live="polite">
          {totalResults} {totalResults === 1 ? "book" : "books"} found
        </div>
      )}
    </section>
  )
}

export default SearchFilter
