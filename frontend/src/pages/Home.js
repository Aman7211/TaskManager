import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import User from '../components/User';
import AssignedTask from '../components/AssignedTask';
import axios from 'axios';
import AddUser from '../components/AddUser';
import UserDashboard from '../components/UserDashboard';

const Home = ({ isLoggedIn, isAdmin, isNormal }) => {
  const [tasks, setTasks] = useState([]);
  const [showAssignedTaskModal, setShowAssignedTaskModal] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://task-zoj6.onrender.com/api/v1/admin/tasks');
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (isLoggedIn && isAdmin) {
      fetchTasks();
    }
  }, [isLoggedIn, isAdmin]);

  const handleAssignedTaskClick = () => {
    setShowAssignedTaskModal(true);
  };

  const handleCloseModal = () => {
    setShowAssignedTaskModal(false);
  };
  const handleAddUser = () => {
    setShowAddUser(true);
  };

  const handleCloseModal1 = () => {
    setShowAddUser(false);
  };

  return (
    <div>
      {localStorage.getItem("authToken") ? (
        <div>
          <h2 className='text-red-600 font-bold text-2xl text-center mt-5'>Welcome to the Task Manager App</h2>
          {isLoggedIn ? (
            <div>
              <p className='text-center mt-2 text-blue-600 font-bold text-xl'>You are logged in as {isAdmin ? 'admin' : 'normal'}.</p>
              <div className='text-center mt-5' >
                {isAdmin && (
                  <button onClick={handleAssignedTaskClick} className='bg-yellow-500 text-red-800 font-bold p-2 rounded-xl'>
                    Assign Task to Any User
                  </button>
                )}
                <div className='mt-3 px-2'>
                  {isAdmin && (
                  <button onClick={handleAddUser} className='bg-yellow-500 text-red-800 font-bold p-2 rounded-xl'>
                    Add New User
                  </button>
                )}
                </div>

              </div>

            </div>
          ) : (
            <div>
              {
                isNormal && (
                <div>
              <p className='text-center mt-2 text-blue-600 font-bold text-xl'>You are logged in as {isNormal ? 'normal' : 'admin'}.</p>
                  </div>)
              }
            </div>
          )}

          {/* Render Task component if user is logged in and isAdmin */}
          {isLoggedIn && isAdmin && <Task isAdmin={isAdmin} tasks={tasks} />}

          {/* Render User component if user is logged in and isAdmin */}
          {isLoggedIn && isAdmin && <User isAdmin={isAdmin} />}
          {isLoggedIn && isNormal && <UserDashboard isNormal={isNormal} />}


          {/* Render AssignedTask modal */}
          {showAssignedTaskModal && <AssignedTask handleCloseModal={handleCloseModal} />}
          {showAddUser && <AddUser handleCloseModal1={handleCloseModal1} />}

        </div>
      ) : (
        <>
          <h1 className='text-red-900 text-center text-[30px] mt-[30px] font-bold '>Hello Everyone</h1>
          <ul className='text-red-700 text-center text-[20px] mt-[10px] font-bold '>
            <li> Created Three Pages Login, Signup and Dashbaord Create two types of user (normal user and admin user)</li>
            <li> Created New User Admin user can able to create new user from dashboard</li>
            <li> Created New Task Admin user can able to ceate new task from dashboard and able assign the task to any normal user</li>
            <li>Created Dasboard Page Once you logged in you will see the Dashboard Page - Admin Should able to view all users and and all tasks</li>
            <li>Create Dashboard Page for user Once user will logged in he can able to view his assigned tasks from the admin</li>
            <li className=' text-blue-700 mt-[40px]'>If you want to direct logged in as Admin then you can use <br/> <span className='text-red-600'> Admin Demo Email Id : </span> amanrathore9861@gmail.com <br/>
            <span className='text-red-600'>Admin Demo Password : </span> Aman@123
            </li>
            <li className=' text-blue-700 mt-[40px]'>If you want to direct logged in as Normal User then you can use <br/> <span className='text-red-600'> User Demo Email Id : </span> amanrathore9841@gmail.com <br/>
            <span className='text-red-600'>User Demo Password : </span> Aman@323
            </li>
            <li className='text-xl mt-[40px] md:mx-[90px]'> Note : If Normal user is showing the admin dashboard please refresh the browser at that time it will get updated.
             This happens because i have deployed the server on the render</li>

          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
