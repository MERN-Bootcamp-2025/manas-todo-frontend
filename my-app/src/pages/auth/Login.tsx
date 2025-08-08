

import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
 import Button from "../../constants/Button";
import Input from "../../constants/Input";
import {  loginSuccess } from "../../redux/slices/authSlice";
import { authService } from "../../services/authService";
import { toast } from 'react-toastify'; 

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


            if(response.user.role === 'Admin'){
                toast.success("Login successful for Admin!");
                navigate('/admin-dashboard')
            } else if( response.user.role === 'User'){
                toast.success('Login Successful for User!');
                navigate('/user-dashboard')
            } else {
                toast.error('Invalid Credentails')
                navigate('/login')
            }
            
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
         
          <main>

            <form onSubmit={handleSubmit}>
                 <div className="min-h-screen flex items-center justify-center ">
                  <div className='w-100'>
                      <h1 className="m-3 text-2xl font-semibold text-center">TaskMaster</h1>
                      <h1 className="m-4 text-3xl font-bold text-center mb-5">Welcome Back</h1>
                   <Input 
                      type="email"
                      name="email"
                      label='Username' 
                      className='border-black' 
                      placeholder='Enter Username'
                      value={formData.email}
                      onChange={handleChange}
                      required>
                    </Input>

                    <Input 
                      type="text"
                      name="password"
                      label='Password' 
                      className='border-black' 
                      placeholder='Enter Password'
                      value={formData.password}
                      onChange={handleChange}
                      required>
                    </Input>
                   <Button className='w-full' primary rounded>Login</Button>
                </div>
            </div>

            </form>

         </main>

        </div>
    )
}


export default Login;