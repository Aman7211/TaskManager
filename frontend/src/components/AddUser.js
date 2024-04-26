import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddUser = ({handleCloseModal1}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/v1/admin/user/add', userData);
//       if (response.data.success) {
//         toast.success("User created successfully!");
//         setUserData({ name: '', email: '', password: '' });
//         // setShowModal(false); // Close the modal after user creation
//       } else {
//         toast.error("Failed to create user. Please try again.");
//       }
//     } catch (error) {
//       console.error('Error creating user:', error);
//       toast.error("An error occurred while creating user. Please try again later.");
//     }
//   };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://task-zoj6.onrender.com/api/v1/admin/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const json = await response.json();
      if (json.success) {
        toast.success("New User is Added Successfully");
        navigate('/');
      } else {
        toast.error("Failed to add the new user");
      }
    } catch (error) {
      console.error('Error in adding new user', error);
      toast.error("An error occurred while adding user. Please try again later.");
    }
  };


  return (
    <>
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white w-96 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <input type="text" name="name" value={userData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" required />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password:</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" required />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Create User</button>
                <button type="button" onClick={handleCloseModal1} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md">Close</button>
              </div>
            </form>
          </div>
        </div>
      <button onClick={handleCloseModal1} className="bg-blue-500 text-white py-2 px-4 rounded-md">Add New User</button>
    </>
  );
};

export default AddUser;
