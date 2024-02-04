import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './MainNavigation.module.css'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Slide , toast } from 'react-toastify';
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import { GrLogout } from "react-icons/gr";

const MySwal = withReactContent(Swal);

const MainNavigation = ({user , userHandler}) => {

  let navigate = useNavigate();
  // let [clicked , setClicked] = useState(false);

  // async function logoutHandler() {
  //   MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Log out!"
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await axios.get('http://localhost:8080/logout' , {withCredentials: true});
  //       toast.success("Logged out successfully" , {
  //         transition: Slide
  //       });
  //       localStorage.removeItem('user');
  //       userHandler(null);
  //       navigate('/');
  //     }
  //   })
  //   // userHandler({});
  // }

  return (
    <nav className={styles.nav}>
        <h2> QuoteVista </h2>
        <ul>
            <li>
              <span style={{color: "#a688fa"}}> <FaRegCircleUser style={{position: 'relative' , bottom: '1.5px'}} /> </span>
              <span> {user.username} </span>
            </li>
            <li className={styles.account}>
              <span style={{color: "#a688fa"}}> <MdOutlineSettings style={{position: 'relative' , bottom: '1.5px'}} /> </span>
              <span> <Link to='/signup'> Sign up </Link> </span>
            </li>
            {!localStorage.getItem('user') ?
                <li className={styles.account}>
                  <span style={{color: "#a688fa"}}> <GrLogin style={{position: 'relative' , bottom: '1.5px'}} /> </span>
                  <span> <Link to='/login'> Login </Link> </span>
                </li>
            :
                <li className={styles.account}>
                  <span style={{color: "#a688fa"}}> <GrLogout style={{position: 'relative' , bottom: '1.5px'}} /> </span>

                  {/* <span onClick={logoutHandler} className={styles.logout}> Logout </span>  */}
                  <span> <Link to='/logout'> Logout </Link> </span>
                </li>
            }
        </ul>
    </nav>
  )
}

export default MainNavigation