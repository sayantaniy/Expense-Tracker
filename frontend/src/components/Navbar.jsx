import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <nav className="bg-dark shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold font-lexend text-accent4">
            Expense Tracker
          </h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login">
              <button className="text-orange-600 hover:text-orange-800 transition-colors">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Sign Up
              </button>
            </Link>
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
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
