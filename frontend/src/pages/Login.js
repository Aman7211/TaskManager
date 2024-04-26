import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
const navigate = useNavigate();

  const [credentials, setcredentials] = useState({email: "", password: "" })

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("https://task-zoj6.onrender.com/api/v1/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
        alert("Enter Valid Credentials ")
    }
    if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken",json.token);
        console.log(localStorage.getItem("authToken"));
        toast.success("User Successfully Logged in");
        navigate("/");
    }
}
const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
}
  return (
    <>
      <div className='mt-[50px]'>
    <p className=' text-red-800 font-bold text-[20px] my-4 mx-4'>Login</p>
    </div>
    <div className="flex flex-col md:flex-row">
      <div className=' md:w-[50%]'>
      <form onSubmit={submitHandler} className="mt-[10px] flex w-full flex-col gap-y-4  mx-4" >
        <div>
          <label className="w-full mb-1 text-[1rem] leading-[1.375rem] font-medium ">Email:</label>
          <input type="email" name='email' value={credentials.email} onChange={onchange} required 
          placeholder="Enter Email Address"
          style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-2 border-blue-50 "/>
        </div>
        <div>
          <label className="mb-1 text-[1rem] leading-[1.375rem]  font-medium">Password:</label>
          <input type="password" name='password' value={credentials.password} onChange={onchange} required 
          placeholder="Enter Password"
          style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 border-2 border-blue-50"
          />
        </div>
        <button type="submit"
className="mt-6 text-[20px] font-semibold tracking-widest rounded-[8px] bg-[#e99e2ddb] py-[8px] px-[12px]  "
>Login</button>
      </form>
      </div>
      <div className='md:w-[50%] md:mt-[-96px]'>
        <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=1380&t=st=1714114460~exp=1714115060~hmac=2e8534c776022603015305fb5a839b6098577372b82f5fd08f0f168bc2456b42" alt="iamge" />
      </div>
    </div>
    </>
  );
};

export default Login;
