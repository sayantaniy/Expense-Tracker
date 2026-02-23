import React from 'react'

const Herosection = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Track Your Expenses Easily
        </h2>
        <p className="text-accent3 max-w-xl mb-6">
          Manage your daily expenses, track spending habits, and stay in control
          of your finances with our simple expense tracker.
        </p>

        <button className=" button-primary text-white px-6 py-3 rounded-lg text-lg ">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Herosection
