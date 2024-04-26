import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = ({ isAdmin }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://task-zoj6.onrender.com/api/v1/admin/tasks');
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    if (isAdmin) {
      fetchTasks();
    }
  }, [isAdmin]);

  return (
    <div className='mt-5'>
      <h2 className='text-center text-blue-800 font-bold text-3xl my-5'>All Tasks</h2>
      <ul className='flex flex-col md:flex-row'>
        {tasks.map(task => (
          <li key={task._id} className='md:w-[25%] mt-2 border mx-4 p-3 h-[300px] bg-yellow-50'>
            <div className='text-center text-red-800 text-2xl font-bold mt-4'>
              <strong>Name : </strong> {task.assignedTo ? task.assignedTo.name : 'No user assigned'}
            </div>
            <div>
              <p className='text-xl font-bold text-center text-red-700 my-3'>Task Detail Assigned</p>
            </div>
            <div className='text-center'>
              <strong>Title : </strong> {task.title}
            </div>
            <div className='text-center'>
              <strong>Description : </strong> {task.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
