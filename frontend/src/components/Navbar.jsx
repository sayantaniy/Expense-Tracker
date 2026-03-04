import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // Try to fetch transactions to check if user is authenticated
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/list`, {
        withCredentials: true
      })
      setIsLoggedIn(true)
    } catch (error) {
      setIsLoggedIn(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {}, {
        withCredentials: true
      })
      setIsLoggedIn(false)
      setIsMenuOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
      // Even if logout fails, clear local state
      setIsLoggedIn(false)
      navigate('/')
    }
  }

  if (isLoading) {
    return (
      <nav className="bg-dark shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-lexend text-accent4">
            Expense Tracker
          </h1>
        </div>
      </nav>
    )
  }

  return (
    <div>
      <nav className="bg-dark shadow-md p-4">
        <div className="flex justify-between items-center">
          <Link to={isLoggedIn ? "/transactions" : "/"}>
            <h1 className="text-xl md:text-2xl font-bold font-lexend text-accent4 cursor-pointer">
              Expense Tracker
            </h1>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/transactions">
                  <button className="text-accent4 hover:text-orange-400 px-4 py-2 transition-colors">
                    Dashboard
                  </button>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-orange-600 hover:text-orange-800 px-4 py-2 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-accent4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <Link to="/transactions" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full text-left text-accent4 hover:text-orange-400 py-2">
                      Dashboard
                    </button>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full text-left text-orange-600 hover:text-orange-800 py-2">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
