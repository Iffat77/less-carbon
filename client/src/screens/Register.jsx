import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import authService from "../services/auth.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { name, email, password, rePassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const token = await authService.register(name, email, password);
      localStorage.setItem("token", token);
      // Redirect to the login page or show a success message
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <section>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an Account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter Username"
            onChange={onChange}
          />

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

          <input
            type="password"
            id="re-password"
            name="rePassword"
            value={rePassword}
            placeholder="Confirm Password"
            onChange={onChange}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default Register;
