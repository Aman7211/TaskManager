import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AssignedTask = ({ handleCloseModal }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ title: "", description: "", assignedTo: "" });

  const assignTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://task-zoj6.onrender.com/api/v1/admin/assigntasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const json = await response.json();
      if (json.success) {
        toast.success("Task Successfully Assigned");
        navigate('/');
      } else {
        toast.error("Failed to assign task. Please try again.");
      }
    } catch (error) {
      console.error('Error assigning task:', error);
      toast.error("An error occurred while assigning task. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://task-zoj6.onrender.com/api/v1/admin/users');
        setUsers(response.data.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='absolute top-[20%] left-[10%] transform [-translate-x-1/2 -translate-y-1/2] bg-green-900 h-[65%] w-[80%] border-4 border-red-900 text-white p-6 rounded-lg'>
      <button onClick={handleCloseModal} className='absolute top-2 right-2 text-white hover:text-gray-200 focus:outline-none'>
        Close
      </button>
      <h2 className='text-center mb-4 fond-bold text-[40px]'>Assign Task to Normal User</h2>
      <form onSubmit={assignTask}>
        <div className='mb-4'>
          <label className='block'>Select User:</label>
          <select name="assignedTo" value={credentials.assignedTo} onChange={onChange} className='w-full py-2 px-3 border rounded-md text-gray-500'>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label className='block'>Task Title:</label>
          <textarea name="title" value={credentials.title} onChange={onChange} required placeholder="Enter the task title" className='w-full h-20 resize-none border rounded-md text-gray-600'></textarea>
        </div>
        <div className='mb-4'>
          <label className='block'>Task Description:</label>
          <textarea name="description" value={credentials.description} onChange={onChange} required placeholder="Enter the task description" className='w-full h-20 resize-none border rounded-md text-gray-600'></textarea>
        </div>
        <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Assign Task</button>
      </form>
    </div>
  );
};

export default AssignedTask;
