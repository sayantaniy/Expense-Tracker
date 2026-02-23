import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-dark shadow-md p-4 flex justify-between">
        <h1 className="text-2xl font-bold font-lexend text-accent4">
          Expense Tracker
        </h1>
        <div>
          <Link to="/login">
            <button className="mr-4 text-orange-600 hover:text-orange-600">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
