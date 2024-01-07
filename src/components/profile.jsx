import React, { useContext, useEffect } from 'react'
import { Context } from '../main'
import "../css/profile.css"
import { Navigate } from 'react-router-dom';
import Loader from './loader';

function Profile() {

  const { isAuthenticated, loading, user } = useContext(Context);
  // useEffect(()=>{

  // })
  // console.log(user)
  // loading
  // if(!isAuthenticated) return <Navigate to={"/logerr"}/>
  // console.log(isAuthenticated)
  if (isAuthenticated) {
    return (
      loading ? <Loader /> : (
        <div className='profile'>
          <div className="container">
            <h1>My Profile</h1>
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
          </div>
        </div>
      ))
  }
  else{
    return <Navigate to="/login"/>;
  }
}

export default Profile
