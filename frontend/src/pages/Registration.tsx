import React from 'react';

const Register: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Space Saver App</h1>
        <form className="bg-gray-100 p-4 rounded-lg">
          <div className="mb-4">
            <label htmlFor="username" className="block font-bold text-sm mb-1">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold text-sm mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold text-sm mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Choose a password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-bold text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4"
          >
            Register
          </button>
        </form>
        <div className="text-center">
            <span className="text-gray-500 mx-2">Already have an account?</span>
            <a href="/login" className="text-blue-500 font-bold hover:underline">
                Login Here
            </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
