import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UserDashboard = () => {
    
    const [assignedTasks, setAssignedTasks] = useState([]);

    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const token = localStorage.getItem('authToken');

                // Parse the JWT token to extract the payload
                const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
                
                // Extract the role from the payload
                const taskId = payload ? payload.id : null;
                if (!taskId) {
                    toast.error("User ID not found");
                    return;
                }
                
                const response = await fetch(`https://task-zoj6.onrender.com/api/v1/admin/getusertask/${taskId}`);
                const result = await response.json();
               setAssignedTasks(result.task);
            } catch (error) {
                console.error('Error fetching assigned tasks:', error);
                toast.error("An error occurred while fetching assigned tasks");
            }
        };

        fetchAssignedTasks();
    }, []);

    return (
        <div className='text-center'>
            <h2 className='text-red-800 text-2xl font-bold'>User Dashboard</h2>
            <ul className='h-[200px] md:w-[25%] mt-4 bg-blue-50 mx-4'>
                {assignedTasks ? (
                    <div>
                        <h3 className='text-red-700 text-xl font-bold pt-5'>{assignedTasks.title}</h3>
                        <p className='text-red-700 text-xl font-bold pt-5'>{assignedTasks.description}</p>
                    </div>
                ) : (
                    <div className='py-4 text-red-700 font-bold'>No tasks assigned</div>
                )}
            </ul>
        </div>
    );
}

export default UserDashboard;
