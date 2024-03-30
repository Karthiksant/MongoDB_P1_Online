
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "./config"; // Import the config.js file

const UpdateUser = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { id } = useParams();

  // Fetch single user data
  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/getoneuser/${id}`); // Use config.apiUrl here
      setInputUser({
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  // Handle input change
  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(`${config.apiUrl}/updateuser/${id}`, inputUser); // Use config.apiUrl here
      if (res.status === 200) {
        window.location = "/"; // Redirect to home page after successful update
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 mb-4 w-full md:w-1/2  mx-auto" style={{ borderRadius: '10px', boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.5)' }}>
        <h1 className="text-center text-3xl font-bold mb-6 text-yellow-400">Update User</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm text-gray-500">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full px-3 py-2 text-sm text-gray-800 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-500">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full px-3 py-2 text-sm text-gray-800 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter email"
            required
            value={inputUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-gray-500">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full px-3 py-2 text-sm text-gray-800 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Enter password"
            required
            value={inputUser.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-md shadow-md hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
