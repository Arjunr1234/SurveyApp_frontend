import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { validateSignup } from '../../utils/Validation'
import { FaUser, FaPhone, FaEnvelope, FaLock } from 'react-icons/fa'
import { signupService } from '../../services/service'
import SignupImg from '../../assets/signup.jpg'

function SignupComp() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const newErrors = validateSignup(name, phone, email, password)
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await signupService(name, email, phone, password) 
      if(response.success){
        toast.success('Signup successful!');
        navigate('/')
      } 
      } catch (error) {
        toast.error(error.response.data.message) 
      }
     
    } else {
      setTimeout(() => setErrors({}), 2000)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="flex w-full max-w-4xl bg-white/20 backdrop-blur-md shadow-xl rounded-xl overflow-hidden border border-white/30">
      
        <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${SignupImg})` }}
        ></div>

      
        <div className="w-full md:w-1/2 p-10">
          {/* <h1 className="text-4xl font-bold text-gray-200 text-center mb-2">Let's Chat</h1> */}
          <h2 className="text-lg text-gray-300 text-center mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-white/10 text-gray-100 placeholder-gray-400 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-white/10 text-gray-100 placeholder-gray-400 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-white/10 text-gray-100 placeholder-gray-400 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-white/10 text-gray-100 placeholder-gray-400 rounded-lg border border-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-80 transition duration-300"
            >
              Sign Up
            </button>

            <p
              className="text-gray-300 text-center mt-3 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Already a user? <span className="text-blue-400 font-semibold">Sign In</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupComp
