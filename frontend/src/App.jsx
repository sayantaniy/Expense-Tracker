import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Transaction from "./pages/Transaction"

const App = () => {
  return (
    <div >
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/transactions" element={<Transaction />} />

      </Routes>
    </div>
  )
}

export default App
