import React from 'react'

const Features = () => {
  return (
    <div className="pb-8 md:pb-12">
      <div className="mt-12 md:mt-20 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
        
        <div className="bg-light p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-accent3">
            Add Expenses
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Quickly add and categorize your expenses.
          </p>
        </div>

        <div className="bg-light p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-accent3">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Track Spending
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Monitor where your money goes.
          </p>
        </div>

        <div className="bg-light p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-accent3">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Stay Organized
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Keep all your expenses in one place.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Features
