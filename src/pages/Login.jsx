import { useState } from 'react';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const db = getFirestore();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError('');
    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        
        await signInWithEmailAndPassword(auth, userData.email, password);
        
        setUser({ uid: userDoc.id, ...userData });
        
        setSuccessMessage('Login successful!');
        
        navigate('/'); 
      } else {
        setError('Username not found');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white/80 shadow-lg rounded-lg max-w-md w-full p-8 m-4 text-center backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-6 text-yellow-600">Welcome Back to CSK Fan Club</h2>
        <p className="text-gray-700 mb-8">Log in to connect with your fellow fans!</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="text-left">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:ring focus:ring-yellow-500 focus:outline-none"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Enter your password"
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
            Login
          </button>

          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>

        <p className="text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
