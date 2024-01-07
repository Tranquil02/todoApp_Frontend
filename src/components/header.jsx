import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import "../css/header.css";
import "../css/utils.css"
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

function Header() {
  const {isAuthenticated,setisAuthenticated,loading,setLoading}=useContext(Context);
  // console.log(loading);
  
  const logoutHandler=async(e)=>{
    setLoading(true);
    try {
      const data= await axios.get(`${server}/user/logout`,{
          withCredentials:true
        })
      console.log(data);
      toast.success(data.data.message);
      setisAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message) 
      setisAuthenticated(true)
      setLoading(false);
    }
  }
  return (
    <div className='header'>
      <div className="logo">
        TODO APP
      </div>
      <div className="components">
        <Link to={"/"}>Home</Link>
        {isAuthenticated?<Link to={"/profile"}>Profile</Link>:""}
        {
          isAuthenticated?<button className='btn-head' onClick={logoutHandler} disabled={loading}>Logout</button>:
          <Link to={"/login"}>Login</Link>
        }
      </div>
    </div>
  )
}

export default Header
