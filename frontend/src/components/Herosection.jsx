import React from 'react'
import { Link } from 'react-router-dom'

const Herosection = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-16 md:mt-20 px-4 py-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Track Your Expenses Easily
        </h2>
        <p className="text-accent3 max-w-lg md:max-w-xl mb-6 text-sm md:text-base">
          Manage your daily expenses, track spending habits, and stay in control
          of your finances with our simple expense tracker.
        </p>
        <Link to="/transactions">
        <button className="button-primary text-white px-6 py-3 rounded-lg text-base md:text-lg hover:bg-orange-600 transition-colors">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Herosection
