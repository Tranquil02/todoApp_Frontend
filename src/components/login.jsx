import React, { useState,useContext} from 'react';
import { Link ,Navigate} from 'react-router-dom';
import "../css/login.css";
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

function Login() {
  
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const {isAuthenticated,setisAuthenticated,loading,setLoading}=useContext(Context); 

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const data= await axios.post(`${server}/user/login`,{
        email,password},{
          headers:{"Content-Type":"application/json"},
          httpVersion: 'HTTP/1.1',
          withCredentials:true
        })
      // console.log(data);
      toast.success(data.data.message);
      setisAuthenticated(true);
      setLoading(false);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)  
      setisAuthenticated(false)
      setLoading(false);
    }
  }
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className='login'>
      <form action="" className='form' onSubmit={submitHandler}>
        <h1>Login</h1>
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
          <button className="submit" type="submit" disabled={loading}>Login</button>
          <h4>OR</h4>
          <Link to={"/register"} className="submit opt">Register</Link>
          {/* <button className="submit opt">Register</button> */}
      </form>
    </div>
  )
}

export default Login
