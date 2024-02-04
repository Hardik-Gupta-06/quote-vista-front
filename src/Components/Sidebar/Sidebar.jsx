import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineMessage, MdOutlineSettings } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { BiMessageEdit } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { GrLogin, GrLogout } from 'react-icons/gr';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Slide , toast } from 'react-toastify';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const Sidebar = ({userHandler}) => {

  let [width , setWidth] = useState(window.innerWidth);
  let [isClicked , setIsClicked] = useState(false);
  let navigate = useNavigate();
  let [menuUsed , setMenuUsed] = useState(false);

  useEffect(()=> {
    setWidth(window.innerWidth);
  } , []);

  async function logoutHandler() {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get('http://localhost:8080/logout' , {withCredentials: true});
        toast.success("Logged out successfully" , {
          transition: Slide
        });
        localStorage.removeItem('user');
        userHandler(null);
        navigate('/');
      }
    })
    // userHandler({});
  }

  let animation = (width <= 640 && !isClicked) ? 'animate__fadeOutLeft' : 'animate__fadeInLeft';

  return (
    <div>
      {width <= 640 && 
        <div className="menu">
          {!isClicked ?
            (
              <span onClick={() => { setIsClicked(true); setMenuUsed(true) }}> <GiHamburgerMenu /> </span>
            )
            :
            (
              <span onClick={() => { setIsClicked(false) }}> <RxCross2 /> </span>
            )
          }
        </div>
      }
      {(width > 640 || menuUsed) &&
        <div className={`sidebar animate__animated ${animation}`}>
            <br />
            Side Panel
            <br />
            <br />
            <hr />
            <div>
                <span> <MdOutlineMessage /> </span>
                <Link to='/' onClick={() => { setIsClicked(false) }}> All Quotes </Link>
            </div>

            <div>
                <span> <MdOutlineAddBox /> </span>
                <Link to='/new' onClick={() => { setIsClicked(false) }}> Add Quote </Link>
            </div>

            <div>
                <span> <BiMessageEdit /> </span>
                <Link to='/myquotes' onClick={() => { setIsClicked(false) }}> My Quotes </Link>
            </div>

            {width <= 640 &&
              <div>
                <span> <MdOutlineSettings /> </span>
                <Link to='/signup' onClick={() => { setIsClicked(false) }}> Sign up </Link>
              </div>
            }

            {(width <= 640 && !localStorage.getItem('user')) &&
                <div>
                  <span> <GrLogin /> </span>
                  <Link to='/login' onClick={() => { setIsClicked(false) }}> Login </Link>
                </div>
            }

            {(width <= 640 && localStorage.getItem('user')) &&
                <div>
                  <span> <GrLogout /> </span>
                  {/* <span onClick={logoutHandler} style={{color: 'white'}} className="logout"> Logout </span>  */}
                  <span> <Link to='/logout' onClick={() => { setIsClicked(false) }}> Logout </Link> </span>
                </div>
            }
        </div>
        }
    </div>
  )
}

export default Sidebar