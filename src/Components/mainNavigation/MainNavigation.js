import React from 'react'
import {Link} from 'react-router-dom'
import styles from './MainNavigation.module.css'
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import { GrLogout } from "react-icons/gr";

const MainNavigation = ({user}) => {

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
                  <span> <Link to='/logout'> Logout </Link> </span>
                </li>
            }
        </ul>
    </nav>
  )
}

export default MainNavigation