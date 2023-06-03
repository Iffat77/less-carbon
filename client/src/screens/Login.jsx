import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import authService from "../services/auth.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <section className="form bg-gray-50">
        {error && <div className="error">{error}</div>}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>

              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Email
                  </label>
                  <input
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Password
                  </label>
                  <input
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 focus:outline-none "
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={onChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-50 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
