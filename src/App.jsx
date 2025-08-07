import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import Books from "./pages/Books/Books"
import BookDetail from "./pages/BookDetail/BookDetail"
import Dashboard from "./pages/Dashboard/Dashboard"
import Admin from "./pages/Admin/Admin"
import "./styles/globals.css"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
