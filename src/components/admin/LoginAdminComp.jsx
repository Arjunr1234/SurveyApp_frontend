import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { adminLoginService } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function LoginAdminComp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {setAdminLoggedIn, isAdminLoggedIn} = useAuth();

  useEffect(() => {
    if(isAdminLoggedIn){
      navigate('/admin/home', {replace:true})
    }
  },[])

  const handleChange = (e) => {
    console.log("e.target: ", e.target)
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(null);
    console.log("Admin Login Data:", form);
    try {
        const response = await adminLoginService(form)
        if(response.success){
           navigate('/admin/home');
           setAdminLoggedIn(true)
           toast.success("Login Successfull!!")
        }
    } catch (error) {
       toast.error(error.response.data.message)
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Admin Login
        </h2>

        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdminComp;
