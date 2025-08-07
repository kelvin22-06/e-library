"use client"

import { useState, useEffect, useCallback, lazy, Suspense } from "react"
import { books } from "../../data/mockData"
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import Loading from "../../components/Loading/Loading"
// import styles from "./Books.module.css"
import { BookOpen, Sparkles, AlertCircle } from 'lucide-react'

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
   
  <main className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-cyan-100 relative overflow-hidden">
    {/* Background decorations */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl"></div>
    </div>

    {/* Skip link */}
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium z-50 transition-all"
    >
      Skip to main content
    </a>

    {/* Header Section */}
    <header className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Icon and decorative elements */}
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
          <Sparkles className="w-6 h-6 text-blue-500 animate-spin" />
          <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <Sparkles className="w-6 h-6 text-cyan-500 animate-spin delay-300" />
        </div>

        {/* Main title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            St Pauls eLibrary
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Catalog
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed animate-slide-up delay-200">
          Discover and explore our extensive collection of books. Use our smart search and filter options to find exactly what you're looking for in our comprehensive digital library.
        </p>

        {/* Stats bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 animate-slide-up delay-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">10000+ Books</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
            <span className="text-sm font-medium text-gray-600">20+ Subjects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400"></div>
            <span className="text-sm font-medium text-gray-600">50+ Categories</span>
          </div>
        </div>
      </div>
    </header>

    {/* Content Section */}
    <div className="relative px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Search and Filter */}
        <div className="animate-slide-up delay-400 mb-8">
          <SearchFilter 
            onSearch={handleSearch} 
            onFilter={handleFilter} 
            totalResults={filteredBooks.length} 
          />
        </div>

        {/* Main content */}
        <div id="main-content" className="animate-slide-up delay-500">
          {filteredBooks.length > 0 ? (
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              role="grid" 
              aria-label="Books catalog"
            >
              <Suspense fallback={<Loading text="Loading book cards..." />}>
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </Suspense>
            </div>
          ) : (
            <div 
              className="text-center py-16 animate-slide-up delay-600" 
              role="status"
            >
              <div className="max-w-md mx-auto">
                {/* No results icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
                    <AlertCircle className="w-12 h-12 text-orange-500" />
                  </div>
                </div>

                {/* No results content */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  No books found
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Try adjusting your search terms or filters to find what you're looking for in our extensive collection.
                </p>

                {/* Suggestions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Suggestions:</h3>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      Check your spelling and try again
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                      Use broader search terms
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                      Clear filters and try a new search
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

   
  </main>
  )
}

export default Books
