
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import config from "./config"; // Import the config.js file

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${config.apiUrl}/createuser`, inputUser); // Use config.apiUrl here
      console.log(res);
      fetchAllUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Fetch all users
  const [userData, setUserData] = useState([]);
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${config.apiUrl}/getallusers`); // Use config.apiUrl here
      console.log(res);
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${config.apiUrl}/deleteuser/${id}`); // Use config.apiUrl here
      if (res.status === 200) {
        fetchAllUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-5">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full md:w-1/2  mx-auto" style={{borderRadius: '10px', boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.5)'  }}>
      <h1 className="text-center text-3xl font-bold mb-6 text-orange-400">Create User</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter email"
            required
            value={inputUser.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Password"
            required
            value={inputUser.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add User
          </button>
        </div>
      </form>

      <div className="overflow-x-auto" style={{borderRadius: '10px', boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.5)'  }}>
        <table className="w-full bg-white rounded-lg shadow-md" >
          <thead>
            <tr>
              <th className="bg-yellow-500 px-6 py-3 border-b-2 border-gray-300 text-left text-lg leading-4 tracking-wider">SN.</th>
              <th className="bg-orange-500 px-6 py-3 border-b-2 border-gray-300 text-left text-lg leading-4 tracking-wider">Name</th>
              <th className="bg-yellow-500 px-6 py-3 border-b-2 border-gray-300 text-left text-lg leading-4 tracking-wider">Email</th>
              <th className="bg-orange-500 px-6 py-3 border-b-2 border-gray-300 text-left text-lg leading-4 tracking-wider">Password</th>
              <th className="bg-yellow-500 px-6 py-3 border-b-2 border-gray-300 text-left text-lg leading-4 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
             <tr key={item._id} className={index % 5 === 0 ? 'bg-pink-100' : index % 5 === 1 ? 'bg-blue-100' : index % 5 === 2 ? 'bg-green-100' : index % 5 === 3 ? 'bg-yellow-100' : 'bg-gray-100'}>
             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-lg leading-5">{index + 1}</td>
             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-lg leading-5">{item?.name}</td>
             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-lg leading-5">{item?.email}</td>
             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-lg leading-5">{item?.password}</td>
         
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-lg leading-5">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink to={`/readuser/${item._id}`} className="text-blue-500 hover:text-blue-700">
                      Read
                    </NavLink>
                    <NavLink to={`/updateuser/${item._id}`} className="text-yellow-500 hover:text-yellow-700">
                      Edit
                    </NavLink>
                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;


