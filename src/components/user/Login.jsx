import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { validateLogin } from '../../utils/Validation';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { signInService } from '../../services/service';
import LoginImg from '../../assets/login.jpg'
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
   const {setIsUserLoggedIn, isUserLoggedIn} = useAuth()

   useEffect(() => {
       if(isUserLoggedIn){
         navigate('/home', {replace:true})
       }
     },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = validateLogin(email, password);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await signInService(email, password)
        if(response.success){
        toast.success('Login successful!');
        setIsUserLoggedIn(true)
        navigate('/home');
      }
        
      } catch (error) {
        toast.error(error.response.data.message);  
      }
      
    } else {
      setTimeout(() => setErrors({}), 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex w-full max-w-4xl bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <img src={LoginImg} alt="image" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-4xl font-extrabold text-white text-center mb-3">Welcome Back</h1>
          <h2 className="text-lg text-gray-300 text-center mb-6">Login to Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg" />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/30 text-white placeholder-gray-200 rounded-lg border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 text-lg" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/30 text-white placeholder-gray-200 rounded-lg border border-white/40 focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-lg"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Login
            </button>

            <p
              className="text-gray-300 text-center mt-4 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Don't have an account? <span className="text-yellow-400 font-semibold">Sign Up</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
