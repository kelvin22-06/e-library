
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid3X3, List, Download, Eye, BookOpen, Calendar, User, FileType, SortAsc, Sparkles, ChevronDown, X } from 'lucide-react';
import {subjectBooks} from "../../data/mockData"

const Library = () => {
  // State management
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedAuthor, setSelectedAuthor] = useState('All Authors');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedFileType, setSelectedFileType] = useState('All Types');
  const [sortBy, setSortBy] = useState('mostViewed');

  // Mock data
  const mockBooks = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      author: "John Smith",
      subject: "Computer Science",
      year: 2023,
      fileType: "PDF",
      cover: "https://picsum.photos/300/400?random=1",
      description: "A comprehensive introduction to programming fundamentals and computer science concepts.",
      views: 1250,
      downloadCount: 890,
      dateAdded: "2023-12-01"
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      author: "Jane Doe",
      subject: "Mathematics",
      year: 2022,
      fileType: "EPUB",
      cover: "https://picsum.photos/300/400?random=2",
      description: "Advanced calculus and linear algebra for engineering students.",
      views: 980,
      downloadCount: 650,
      dateAdded: "2023-11-15"
    },
    {
      id: 3,
      title: "Modern Physics",
      author: "Dr. Johnson",
      subject: "Physics",
      year: 2023,
      fileType: "PDF",
      cover: "https://picsum.photos/300/400?random=3",
      description: "Quantum mechanics and relativity theory explained with practical examples.",
      views: 2100,
      downloadCount: 1200,
      dateAdded: "2023-12-10"
    },
    {
      id: 4,
      title: "World History",
      author: "Sarah Wilson",
      subject: "History",
      year: 2021,
      fileType: "EPUB",
      cover: "https://picsum.photos/300/400?random=4",
      description: "Comprehensive overview of world civilizations and major historical events.",
      views: 756,
      downloadCount: 420,
      dateAdded: "2023-10-20"
    },
    {
      id: 5,
      title: "Digital Marketing",
      author: "Mike Chen",
      subject: "Business",
      year: 2023,
      fileType: "PDF",
      cover: "https://picsum.photos/300/400?random=5",
      description: "Modern digital marketing strategies and social media optimization.",
      views: 1800,
      downloadCount: 980,
      dateAdded: "2023-12-05"
    },
    {
      id: 6,
      title: "Environmental Science",
      author: "Dr. Green",
      subject: "Science",
      year: 2022,
      fileType: "EPUB",
      cover: "https://picsum.photos/300/400?random=6",
      description: "Climate change, sustainability, and environmental conservation principles.",
      views: 890,
      downloadCount: 567,
      dateAdded: "2023-11-30"
    }
  ];

  // Initialize data
  useEffect(() => {
    setBooks(subjectBooks);
    setFilteredBooks(subjectBooks);
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let filtered = books;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (selectedSubject !== 'All Subjects') {
      filtered = filtered.filter(book => book.subject === selectedSubject);
    }
    if (selectedAuthor !== 'All Authors') {
      filtered = filtered.filter(book => book.author === selectedAuthor);
    }
    if (selectedYear !== 'All Years') {
      filtered = filtered.filter(book => book.year.toString() === selectedYear);
    }
    if (selectedFileType !== 'All Types') {
      filtered = filtered.filter(book => book.fileType === selectedFileType);
    }

    // Apply sorting
    switch (sortBy) {
      case 'mostViewed':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'recentlyAdded':
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedSubject, selectedAuthor, selectedYear, selectedFileType, sortBy]);

  // Get unique values for filters
  const subjects = ['All Subjects', ...new Set(books.map(book => book.subject))];
  const authors = ['All Authors', ...new Set(books.map(book => book.author))];
  const years = ['All Years', ...new Set(books.map(book => book.year.toString()))];
  const fileTypes = ['All Types', ...new Set(books.map(book => book.fileType))];
console.log(authors)
  const BookCard = ({ book, isListView }) => {
    if (isListView) {
      return (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:-translate-y-1">
          <div className="flex p-6 gap-6">
            <div className="flex-shrink-0">
              <img 
                src={book.cover} 
                alt={`Cover of ${book.title}`}
                className="w-24 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 truncate">{book.title}</h3>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    book.fileType === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {book.fileType}
                  </span>
                </div>
              </div>
              <p className="text-blue-600 font-medium mb-2">{book.author}</p>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{book.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>{book.subject}</span>
                <span>•</span>
                <span>{book.year}</span>
                <span>•</span>
                <span>{book.views} views</span>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-200">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl border border-white/20 overflow-hidden transition-all duration-300 transform hover:-translate-y-2">
        <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
          <img 
            src={book.cover} 
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
              book.fileType === 'PDF' ? 'bg-red-100/80 text-red-800' : 'bg-purple-100/80 text-purple-800'
            }`}>
              {book.fileType}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg hover:bg-white transition-all duration-200 text-sm font-medium">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-blue-600 font-medium text-sm mb-2">{book.author}</p>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{book.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{book.subject}</span>
            <span>{book.views} views</span>
          </div>
        </div>
      </div>
    );
  };

//   Main Component 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-cyan-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blue-500 animate-spin" />
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <Sparkles className="w-6 h-6 text-cyan-500 animate-spin delay-300" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Digital Library
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Catalog
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
            Explore our extensive collection of digital books. Search, filter, and discover your next great read.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Search and Controls */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search books, authors, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200"
                />
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {/* Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-md text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-md text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            {isFilterOpen && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  
                  {/* Subject Filter */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Subject
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  {/* Author Filter */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Author
                    </label>
                    <select
                      value={selectedAuthor}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      {authors.map(author => (
                        <option key={author} value={author}>{author}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* File Type Filter */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileType className="w-4 h-4 inline mr-1" />
                      File Type
                    </label>
                    <select
                      value={selectedFileType}
                      onChange={(e) => setSelectedFileType(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      {fileTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <SortAsc className="w-4 h-4 inline mr-1" />
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      <option value="mostViewed">Most Viewed</option>
                      <option value="recentlyAdded">Recently Added</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedSubject('All Subjects');
                      setSelectedAuthor('All Authors');
                      setSelectedYear('All Years');
                      setSelectedFileType('All Types');
                      setSortBy('mostViewed');
                      setSearchTerm('');
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredBooks.length} of {books.length} books
            </p>
          </div>

          {/* Books Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} isListView={viewMode === 'list'} />
            ))}
          </div>

          {/* No Results */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
                    <BookOpen className="w-12 h-12 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No books found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;