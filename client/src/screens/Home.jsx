import React, { useEffect, useState } from 'react';
import authService from "../services/auth.js";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null)
  const isAuthenticated = authService.isAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      const fetchUser = async () => {
        try {
          const userData = await authService.getUserData()
          setUser(userData)
        } catch (error) {
          console.log(error)
        }
      }
  
      fetchUser()
    }
  }, [navigate, isAuthenticated])

  if (!user) {
    return (
      <div>
        <h2>Please log in to view the content.</h2>
        <Link to='/login'>Login</Link>
      </div>
    )
  }

  return (
    <div className='h-screen w-screen'>
      <h2>Welcome, {user.name}!</h2>
    </div>
  )
}

export default Home
