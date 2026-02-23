const Register = () => {
  return (
    <div className="bg-dark flex items-center justify-center h-screen">
      <form className="h-[50%] flex flex-col items-center justify-center bg-sage p-10 rounded-2xl w-[30%] text-accent2 outline-none font-jetbrains"> 
        <h1 className="text-2xl font-bold text-black mb-4">Sign Up</h1>
        <input type="text" placeholder='Name' required className="mb-2 p-2 border-b rounded w-full max-w-xs" />
        <input type="text" placeholder='Username' required className="mb-2 p-2 border-b rounded w-full max-w-xs" />
        <input type="email" placeholder='Email' required className="mb-2 p-2 border-b rounded w-full max-w-xs" />
        <input type="password" placeholder='Password' required className="mb-2 p-2 border-b rounded w-full max-w-xs" />
        <button className='button-primary mt-5 hover:' type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
