import React, { useState,useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../css/login.css";
import axios from "axios"
import { Context, server } from '../main';
import toast from "react-hot-toast"

function Register(){

  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const {isAuthenticated,setisAuthenticated,loading,setLoading}=useContext(Context);

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
    const {data}=await axios.post(`${server}/user/new`,{
      name,email,password
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true
    })
    if(data.success===true) toast.success(data.message)
    else toast.error(data.message)
    setisAuthenticated(true);
    setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
      setisAuthenticated(false);
      setLoading(false);
    }
    
  };
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className='login register'>
      <form action="" className='form'onSubmit={submitHandler}>
        <h1>Register</h1>
          <input value={name} onChange={(e)=>{setName(e.target.value)}} 
          type="text" 
          name="text" 
          required
          placeholder="Enter Name" />
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} 
          type="email" 
          name="email" 
          required
          placeholder="Enter Email" />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}}
          type="password"
          name="password"
          required
          minLength={8}
          placeholder="Enter Password" />
          <button className="submit" type="submit" disabled={loading}>Register</button>
          <h4>OR</h4>
          <Link to={"/login"} className="submit opt">Login</Link>
          {/* <button className="submit opt">Register</button> */}
      </form>
    </div>
  )
}

export default Register;
