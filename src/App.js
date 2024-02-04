import React,{ useEffect, useState } from 'react'
import MainNavigation from './Components/mainNavigation/MainNavigation'
import {Routes , Route, Navigate} from 'react-router-dom'
import NewQuotes from './Components/pages/NewQuotes'
import ShowQuotes from './Components/pages/ShowQuotes'
import EditQuotes from './Components/pages/EditQuotes'
import Login from './Components/authentication/Login'
import Signup from './Components/authentication/Signup'
import Sidebar from './Components/Sidebar/Sidebar'
import './App.css';
import axios from 'axios'
import MyQuotes from './Components/pages/MyQuotes'
import AllQuotes from './Components/pages/AllQuotes'
import { Slide, ToastContainer } from 'react-toastify'
import Logout from './Components/authentication/Logout'

const App = () => {

  let [user , setUser] = useState(JSON.parse(localStorage.getItem('user')));
  
  let id;

  useEffect(()=> {
    if (!user) {
      return;
    }

    if (Date.now() > user.time + 1000 * 7 * 24 * 60 * 60) {
      localStorage.removeItem('user');
      setUser(null);
      return;
    }

    const autoLogin = async () => {
      try {
        let updatedUser = await axios.post("http://localhost:8080/autoLogin", {email: user.email}, {withCredentials: true});
        localStorage.setItem('user' , JSON.stringify(updatedUser.data));

      } catch (error) {
        console.log(error);
      }
    }

    autoLogin();
    
    id = setTimeout(()=> {
      localStorage.removeItem('user');
      setUser(null);
    } , 1000 * 7 * 24 * 60 * 60);

  } , [user]);
  
  function userHandler(users) {
    if (!users) {
      clearTimeout(id);
    }
    setUser(users);
  }
  
  return (
    <>
        <ToastContainer theme='dark' position='top-center' />
        <MainNavigation user={user ? user : {username: 'Anonymous'}} userHandler={userHandler} />
        <Sidebar userHandler={userHandler} />
        {/* <div className='container'> */}

        <main>
          <Routes >
            <Route path='/' element={ <AllQuotes /> } />
            <Route path='/myquotes' element={user ? <MyQuotes /> : <Navigate to="/login" /> } />
            <Route path='/new' element={user ? <NewQuotes /> : <Navigate to="/login"/> } />
            <Route path='/quotes/:id' element={ <ShowQuotes /> } />
            <Route path='/quotes/:id/edit' element={user ? <EditQuotes /> : <Navigate to="/login"/> } />
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/login' element={ <Login userHandler = {userHandler} /> } />
            <Route path='/logout' element={ <Logout userHandler = {userHandler} /> } />
          </Routes>
        </main>

        {/* </div> */}
    </>
  )
}

export default App
