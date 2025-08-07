// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import { borrowedBooks } from "../../data/mockData"
// import Loading from "../../components/Loading/Loading"
// import styles from "./Dashboard.module.css"

// const Dashboard = () => {
//   const [userBooks, setUserBooks] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Simulate API call delay
//     const timer = setTimeout(() => {
//       setUserBooks(borrowedBooks)
//       setLoading(false)
//     }, 800)

//     return () => clearTimeout(timer)
//   }, [])

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   const isOverdue = (dueDateString) => {
//     return new Date(dueDateString) < new Date()
//   }

//   const overdueCount = userBooks.filter((book) => isOverdue(book.dueDate)).length
//   const totalBorrowed = userBooks.length

//   if (loading) {
//     return <Loading text="Loading your dashboard..." />
//   }

//   return (
//     <main className={styles.dashboardPage}>
//       <header className={styles.pageHeader}>
//         <h1 className={styles.pageTitle}>My Dashboard</h1>
//         <p className={styles.welcomeMessage}>Welcome back! Here's an overview of your library activity.</p>
//       </header>

//       <div className={styles.dashboardGrid}>
//         <div className={styles.mainContent}>
//           <section className={styles.section}>
//             <header className={styles.sectionHeader}>
//               <h2 className={styles.sectionTitle}>Currently Borrowed Books</h2>
//             </header>
//             <div className={styles.sectionContent}>
//               {userBooks.length > 0 ? (
//                 <div className={styles.borrowedBooksList}>
//                   {userBooks.map((book) => (
//                     <article key={book.id} className={styles.borrowedBookItem}>
//                       <img
//                         src={book.coverImage || "/placeholder.svg"}
//                         alt={`Cover of ${book.title}`}
//                         className={styles.bookThumbnail}
//                         loading="lazy"
//                       />
//                       <div className={styles.bookInfo}>
//                         <h3 className={styles.bookTitle}>{book.title}</h3>
//                         <p className={styles.bookAuthor}>by {book.author}</p>
//                         <div className={styles.bookDates}>
//                           <div className={styles.dateInfo}>
//                             <span className={styles.dateLabel}>Borrowed:</span>
//                             <span className={styles.dateValue}>{formatDate(book.borrowDate)}</span>
//                           </div>
//                           <div className={styles.dateInfo}>
//                             <span className={styles.dateLabel}>Due:</span>
//                             <span className={`${styles.dateValue} ${isOverdue(book.dueDate) ? styles.overdue : ""}`}>
//                               {formatDate(book.dueDate)}
//                               {isOverdue(book.dueDate) && " (Overdue)"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               ) : (
//                 <div className={styles.emptyState}>
//                   <h3 className={styles.emptyStateTitle}>No borrowed books</h3>
//                   <p>You haven't borrowed any books yet. Browse our catalog to get started!</p>
//                   <Link
//                     to="/"
//                     className={styles.actionButton}
//                     style={{ marginTop: "var(--spacing-md)", display: "inline-block" }}
//                   >
//                     Browse Books
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>

//         <aside className={styles.sidebar}>
//           <section className={styles.section}>
//             <header className={styles.sectionHeader}>
//               <h2 className={styles.sectionTitle}>Quick Stats</h2>
//             </header>
//             <div className={styles.sectionContent}>
//               <div className={styles.statsGrid}>
//                 <div className={styles.statItem}>
//                   <span className={styles.statNumber}>{totalBorrowed}</span>
//                   <span className={styles.statLabel}>Books Borrowed</span>
//                 </div>
//                 <div className={styles.statItem}>
//                   <span className={`${styles.statNumber} ${overdueCount > 0 ? styles.overdue : ""}`}>
//                     {overdueCount}
//                   </span>
//                   <span className={styles.statLabel}>Overdue</span>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section className={styles.section}>
//             <header className={styles.sectionHeader}>
//               <h2 className={styles.sectionTitle}>Quick Actions</h2>
//             </header>
//             <div className={styles.sectionContent}>
//               <div className={styles.quickActions}>
//                 <Link to="/" className={styles.actionButton}>
//                   Browse Catalog
//                 </Link>
//                 <button
//                   className={`${styles.actionButton} ${styles.secondary}`}
//                   onClick={() => alert("Renew functionality would be implemented with backend")}
//                 >
//                   Renew Books
//                 </button>
//                 <button
//                   className={`${styles.actionButton} ${styles.secondary}`}
//                   onClick={() => alert("History functionality would be implemented with backend")}
//                 >
//                   View History
//                 </button>
//               </div>
//             </div>
//           </section>
//         </aside>
//       </div>
//     </main>
//   )
// }

// export default Dashboard
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { borrowedBooks } from "../../data/mockData"
import Loading from "../../components/Loading/Loading"

const Dashboard = () => {
  const [userBooks, setUserBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
    <main className="max-w-7xl mx-auto px-4 py-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your library activity.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Currently Borrowed Books</h2>

            {userBooks.length > 0 ? (
              <div className="space-y-4">
                {userBooks.map((book) => (
                  <article key={book.id} className="flex items-start gap-4 border p-4 rounded-xl hover:shadow-lg">
                    <img
                      src={book.coverImage || "/placeholder.svg"}
                      alt={`Cover of ${book.title}`}
                      className="w-20 h-28 object-cover rounded-lg shadow-sm"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                      <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Borrowed:</span> {formatDate(book.borrowDate)}
                        </div>
                        <div>
                          <span className="font-medium">Due:</span>{" "}
                          <span className={`${isOverdue(book.dueDate) ? "text-red-600 font-semibold" : ""}`}>
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
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold text-gray-700">No borrowed books</h3>
                <p className="text-gray-500 mt-2">You haven't borrowed any books yet. Browse our catalog to get started!</p>
                <Link
                  to="/"
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Browse Books
                </Link>
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{totalBorrowed}</p>
                <p className="text-sm text-gray-500">Books Borrowed</p>
              </div>
              <div className="text-center">
                <p className={`text-3xl font-bold ${overdueCount > 0 ? "text-red-600" : "text-gray-800"}`}>{overdueCount}</p>
                <p className="text-sm text-gray-500">Overdue</p>
              </div>
            </div>
          </section>

          <section className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/"
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Catalog
              </Link>
              <button
                className="w-full text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                onClick={() => alert("Renew functionality would be implemented with backend")}
              >
                Renew Books
              </button>
              <button
                className="w-full text-center bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                onClick={() => alert("History functionality would be implemented with backend")}
              >
                View History
              </button>
            </div>
          </section>
        </aside>
      </div>
    </main>
  )
}

export default Dashboard
