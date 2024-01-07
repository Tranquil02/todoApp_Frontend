import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import "../css/utils.css"

function NotLogin() {
  return (
    <div className='notLogin'>
      <h1 className='title'>Login First</h1>
      <Link to={"/login"} className="blue-btn">Login</Link>
    </div>
  )
}

export default NotLogin
