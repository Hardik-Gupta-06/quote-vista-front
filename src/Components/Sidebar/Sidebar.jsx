import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { MdOutlineMessage, MdOutlineSettings } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { BiMessageEdit } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { GrLogin, GrLogout } from 'react-icons/gr';

const Sidebar = () => {

  let [width , setWidth] = useState(window.innerWidth);
  let [isClicked , setIsClicked] = useState(false);
  let [menuUsed , setMenuUsed] = useState(false);

  useEffect(()=> {
    setWidth(window.innerWidth);
  } , []);

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
                  <span> <Link to='/logout' onClick={() => { setIsClicked(false) }}> Logout </Link> </span>
                </div>
            }
        </div>
        }
    </div>
  )
}

export default Sidebar