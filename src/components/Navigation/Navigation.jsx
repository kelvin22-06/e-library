import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { BookOpen, Home, LayoutDashboard, Settings, Menu, X, Sparkles } from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const navItems = [
    { path: "/", label: "Books", icon: BookOpen },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin", label: "Admin", icon: Settings },
  ]

  return (
    <nav 
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm"
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              St Pauls eLibrary
            </span>
            <Sparkles className="w-4 h-4 text-blue-500 animate-spin opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
                        ${active 
                          ? 'text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }
                      `}
                      onClick={closeMenu}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                      
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative p-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'
                }`} 
              />
              <X 
                className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          id="nav-menu"
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen 
              ? 'max-h-64 opacity-100 pb-4' 
              : 'max-h-0 opacity-0 pb-0'
            }
          `}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 mt-2">
            <ul className="py-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const active = isActive(item.path)
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-xl font-medium transition-all duration-200 transform
                        ${active 
                          ? 'text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md scale-[0.98]' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-[0.98]'
                        }
                      `}
                      onClick={closeMenu}
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        animation: isMenuOpen ? 'slideInUp 0.3s ease-out forwards' : 'none'
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                      
                      {/* Active indicator for mobile */}
                      {active && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      
    </nav>
  )
}

export default Navigation