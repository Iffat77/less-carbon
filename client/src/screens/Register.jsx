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
      <section className="form bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>

              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Name
                  </label>

                  <input
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter Username"
                    onChange={onChange}
                  />
                </div>
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
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label
                    for="confirmpass"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Confirm Password
                  </label>

                  <input
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    type="password"
                    id="re-password"
                    name="rePassword"
                    value={rePassword}
                    placeholder="Confirm Password"
                    onChange={onChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-50 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
