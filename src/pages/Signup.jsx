import { useState } from 'react';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const db = getFirestore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store username and email in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email
      });

      alert('Signup successful!');
      navigate('/'); // Navigate to the home page after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white/80 shadow-lg rounded-lg max-w-md w-full p-8 m-4 text-center backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-6 text-yellow-600">Join the CSK Fan Club</h2>
        <p className="text-gray-700 mb-8">Stay updated and connect with other fans!</p>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className='text-left'>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:ring focus:ring-yellow-500 focus:outline-none"
            />
          </div>

          <div className="text-left">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:ring focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'} 
                className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:ring focus:ring-yellow-500 focus:outline-none"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-lg font-bold text-lg hover:bg-yellow-700 transition duration-200"
          >
            Sign Up
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>

        <p className="text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
