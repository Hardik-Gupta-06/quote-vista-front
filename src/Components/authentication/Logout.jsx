import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { URL } from '../url';

const MySwal = withReactContent(Swal);

const Logout = ({userHandler}) => {

  let navigate = useNavigate();

  function logoutHandler() {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      denyButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.get(`${URL}/logout` , {withCredentials: true});
        toast.success("Logged out successfully" , {
          transition: Slide
        });
        localStorage.removeItem('user');
        userHandler(null);
        navigate('/');
      }
      else if (result.isDenied) {
        navigate('/');
      }
    })
  }

  useEffect(()=> {
    logoutHandler();
  } , []);

  return (
    null
  )
}

export default Logout