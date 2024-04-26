import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ isAdmin }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://task-zoj6.onrender.com/api/v1/admin/users');
        setUsers(response.data.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  return (
    <div>
       <h2 className='text-center text-blue-800 font-bold text-3xl mt-5'>All Users</h2>
      <ul className='text-center mt-4 container mx-auto'>
        {users.map(user => (
          <li key={user._id} className='bg-blue-50 my-3 p-3 mx-[50px]'>
            <div><strong>Name:</strong> {user.name}</div> 
            <div><strong>Email:</strong> {user.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
