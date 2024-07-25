import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Auth System</h1>
      <div className="space-x-4">
        <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded">Register</Link>
        <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded">Login</Link>
      </div>
    </div>
  );
}

export default App;
