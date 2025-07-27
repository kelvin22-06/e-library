"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Navigation.module.css"

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

  return (
    <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          📚 eBooks eLibrary
        </Link>

        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <ul id="nav-menu" className={`${styles.navMenu} ${isMenuOpen ? styles.open : ""}`}>
          <li className={styles.navItem}>
            <Link to="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`} onClick={closeMenu}>
              Books
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/dashboard"
              className={`${styles.navLink} ${isActive("/dashboard") ? styles.active : ""}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/admin"
              className={`${styles.navLink} ${isActive("/admin") ? styles.active : ""}`}
              onClick={closeMenu}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
