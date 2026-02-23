import React from 'react'

const Features = () => {
  return (
    <div>
      <div className="mt-20 px-8 grid md:grid-cols-3 gap-6 mb-10">
        
        <div className="bg-light p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2 text-accent3">
            Add Expenses
          </h3>
          <p className="text-gray-600">
            Quickly add and categorize your expenses.
          </p>
        </div>

        <div className="bg-light p-6 rounded-xl shadow text-accent3">
          <h3 className="text-xl font-semibold mb-2">
            Track Spending
          </h3>
          <p className="text-gray-600">
            Monitor where your money goes.
          </p>
        </div>

        <div className="bg-light p-6 rounded-xl shadow text-accent3">
          <h3 className="text-xl font-semibold mb-2">
            Stay Organized
          </h3>
          <p className="text-gray-600">
            Keep all your expenses in one place.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Features
