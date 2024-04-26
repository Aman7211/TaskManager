import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Task from './components/Task';
import User from './components/User';
import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNormal, setIsNormal] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('authToken');

    // Parse the JWT token to extract the payload
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    
    // Extract the role from the payload
    const userRole = payload ? payload.role : null;
    
    console.log(userRole);
    if (userRole === 'admin') {
      setIsLoggedIn(true);
      setIsAdmin(true); // Set isAdmin based on the user's role
    }

    if (userRole === 'normal') {
      setIsLoggedIn(true);
      setIsNormal(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} isAdmin={isAdmin} isNormal={isNormal} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/tasks' element={<Task />} />
        <Route path='/users' element={<User />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />

      </Routes>
    </>
  );
}

export default App;





// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isNormal, setIsNormal] = useState(false);


//   useEffect(() => {
//     // Check user's role when the component mounts
//     const userRole = localStorage.getItem('userRole');
//     if (userRole==='admin') {
//       setIsLoggedIn(true);
//       setIsAdmin(true); // Set isAdmin based on the user's role
//     }

//     if(userRole==='normal'){
//       setIsLoggedIn(true);
//       setIsNormal(true);
//     }
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path='/' element={<Home isLoggedIn={isLoggedIn} isAdmin={isAdmin} isNormal={isNormal}/>} />
//         <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setIsNormal={setIsNormal}/>} />
//         <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} setIsNormal={setIsNormal} />} />
//         {/* Only render the Task and User components if the user is logged in and is an admin */}
//         {isLoggedIn && isAdmin && (
//           <>
//             <Route path='/tasks' element={<Task />} />
//             <Route path='/users' element={<User />} />
//           </>
//         )}
//         {
//           isLoggedIn && isNormal && (
//             <>
//            <Route path='/user-dashboard' element={<UserDashboard />} />
//             </>
//           )
//         }
//       </Routes>
//     </>
//   );
// }
