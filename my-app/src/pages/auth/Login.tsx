

import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
 import Button from "../../constants/Button";
import Input from "../../constants/Input";
import {  loginSuccess } from "../../redux/slices/authSlice";
import { authService } from "../../services/authService";
import { toast } from 'react-toastify'; 
import LoginImage from "../../assets/login.jpg"

const Login : React.FC = () => {
    
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

            const response = await authService.login(formData);

            dispatch(
                loginSuccess({
                    user: response.user,
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                })
            );

            toast.success('Login Successful !')
            navigate('/tasks');

            
        } catch (error) {
            throw new Error('Login Failed')
            
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}))
    }

    return (
        <div>
         
          <main className="min-h-screen bg-gray-50 flex items-center justify-center">

            <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-4">
                 <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 md:p-8 min-h-[580px]">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
            <div className="hidden md:flex items-center justify-center h-full">
              <img
                src={LoginImage}
                alt="Login illustration"
                className="h-[420px] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-center h-full">
              <div className="text-center md:text-left mb-8">
                <h1 className="text-2xl font-semibold">TaskMaster</h1>
                <h2 className="mt-2 text-3xl font-bold">Welcome Back</h2>
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  label="Username"
                  placeholder="Enter your username"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-xl border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                  required
                />

                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-xl border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500"
                  required
                />

                <Button type="submit" className="w-full mt-2 rounded-xl" primary>
                  Login
                </Button>


              </div>
                   
                </div>
            </div>
            </div>

            </form>

         </main>

        </div>
    )
}


export default Login;