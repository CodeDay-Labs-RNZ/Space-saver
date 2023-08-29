import { useRef, useState, useEffect } from 'react';
const styles = require('../styles/Register.css');


const Login: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLInputElement | null>(null);

  const [userEmail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [userEmail, password]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    setUserEmail('');
    setPassword('');
    setSuccess(true);
    
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Space Saver App</h1>
          {success ? (
          <section>
            <h1>You are logged in</h1>
            <br />
            <p>
              {/* Redirect to dashboard page here */}
            </p>
          </section>
        ) : (
          <form className="bg-gray-100 p-4 rounded-lg" onSubmit={handleSubmit}>
          <p ref={errRef} className={errMsg ? "errorMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <div className="mb-4">
              <label htmlFor="email" className="block font-bold text-sm mb-1">Email</label>
              <input
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="Enter your username"
                ref={emailInputRef}
                autoComplete='off'
                onChange={(e) => setUserEmail(e.target.value)}
                value={userEmail}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold text-sm mb-1">Password</label>
              <input
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
            >
              Login
            </button>
          </form>
        )}
        <div className="text-center">
          <a href="#forget-password" className="text-blue-500 hover:underline">Forgot Password?</a>
          <span className="text-gray-500 mx-2">|</span>
          <a href="/registration" className="text-white font-bold hover:underline bg-black py-2 px-4 rounded">
            New User? Register Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
