import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import Header from "./components/header";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import NotLogin from "./components/notLogin";

function App() {

  const {setUser,setisAuthenticated}=useContext(Context);
  
  useEffect(()=>{
    axios.get(`${server}/user/me`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.details);
      // console.log(res)
      setisAuthenticated(true);
    }).catch((error)=>{
      setUser({});
      setisAuthenticated(false);
    })
  },[]);
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/logerr" element={<NotLogin/>}/>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App
