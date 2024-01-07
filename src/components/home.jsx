import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "../css/login.css";

import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
// import Task from './Task';

function Home() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [task, setTask] = useState([]);
  const [refresh,setRefresh]=useState(false)
  const { isAuthenticated, loading, setLoading } = useContext(Context);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateHandler = async (id) => {
    try {
      const {data}=await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true
      })
      toast.success(data.message);
      setRefresh(prev=>!prev)
      // console.log(setRefresh(prev=>!prev))
    } catch (error) {
      toast.error("Some error ocuur")
    }  
  }
  const DeleteHandler = async(id) => {
    try {
      const {data}=await axios.delete(`${server}/task/${id}`,{}, {
        withCredentials: true
      })
      console.log(data)
      toast.error(data.message);
      setRefresh(prev=>!prev)
    } catch (error) {
      console.log(error)
      toast.error("Error occur")
    }
  }

  const addHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post(`${server}/task/new`, {
        title, description: desc
      }, {
        headers: { "Content-Type": "application/json" },
        httpVersion: 'HTTP/1.1',
        withCredentials: true
      })
      // console.log(data);
      setTitle("")
      setDesc("")
      toast.success(data.data.message);
      setLoading(false);
      setRefresh(prev=>!prev)
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message)
      setLoading(false);
    }
  }

  useEffect(() => {
    axios.get(`${server}/task/all`, {
      withCredentials: true
    }).then((res) => {
      setTask(res.data.mytask)
      // console.log(res.data.mytask);
    }).catch((e) => {
      toast.error(e.response.data.message)
    })
  },[refresh])

  if (!isAuthenticated) return <Navigate to={"/login"} />
  return (
    <div className='task'>
      <form action="" className='form' onSubmit={addHandler}>
        <h1>ADD TASK</h1>
        <input value={title} onChange={(e) => { setTitle(e.target.value) }}
          type="text"
          name="title"
          required
          placeholder="Enter Task Title" />
        <input value={desc} onChange={(e) => { setDesc(e.target.value) }}
          type="text"
          name="title"
          required
          placeholder="Enter Task Description" />
        <button className="submit" type="submit" disabled={loading}>Add Task</button>
      </form>
      <section className="todos">
        
        <h2>Your Tasks</h2>
        {
          task?.map((i) => 
            (
              <div className='to-do' key={i._id}>
                <div className='tasks' >
                  <h3>{capitalize(i.title)}</h3>
                  <p>{capitalize(i.description)}</p>
                </div>
                <div className="cont">
                  <input type="checkbox" className='checkbox' onChange={() => { updateHandler(i._id) }} checked={i.isCompleted} />
                  <button className="blue-btn" onClick={() => { DeleteHandler(i._id) }}>Delete</button>
                </div>
              </div>

              // <Task title={i.title} description={i.description} key={i._id}/>
            )
          )
        }
      </section>
    </div>
  )
}

export default Home
