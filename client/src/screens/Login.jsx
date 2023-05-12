import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import authService from "../services/auth.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData
  const [error, setError] = useState(null)
  const navigate = useNavigate()



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await authService.login(email, password)
      navigate("/")
    } catch (error) {
      setError("Login failed. Please check your credentials.")
    }
  }

  return (
    <div>
      <section>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to Less Carbon</p>
      </section>
  
      <section className="form">
        {error && <div className="error">{error}</div>}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={onChange}
          />

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={onChange}
          />

          <button type="submit"> Submit </button>
        </form>
      </section>
    </div>
  )
}

export default Login
