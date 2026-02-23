const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const identifier = e.target.identifier.value; // username OR email
    const password = e.target.password.value;

    console.log(identifier, password);
  };

  return (
    <div className="bg-dark flex items-center justify-center h-screen">
      <form 
        onSubmit={handleSubmit}
        className="h-[50%] flex flex-col items-center justify-center bg-sage p-10 rounded-2xl lg:w-[30%] text-accent2 outline-none font-jetbrains"
      > 
        <h1 className="text-2xl font-bold text-black mb-4"> User Login</h1>

        {/* ONE FIELD for Username OR Email */}
        <input 
          type="text" 
          name="identifier"
          placeholder="Username or Email"
          required
          className="mb-2 p-2 border-b rounded w-full max-w-xs"
        />

        <input 
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-2 p-2 border-b rounded w-full max-w-xs"
        />

        <button 
          className="button-primary mt-5 hover:bg-orange-600" 
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;