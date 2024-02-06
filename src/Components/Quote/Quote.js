import React from 'react'
import styles from './Quote.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Slide, toast } from 'react-toastify';
import LikeQuote from '../likes/LikeQuote';
import { BiDetail } from "react-icons/bi";
import ShareQuote from '../share/ShareQuote';
import { URL } from '../url';

const MySwal = withReactContent(Swal);

const Quote = ({getQuotes , text , author , id , likes , userOnly}) => {
  
  let navigate = useNavigate();
  
  function showQuoteHandler(id) {
    navigate(`/quotes/${id}`);
  }
  
  function editQuoteHandler(id) {
    navigate(`/quotes/${id}/edit`);
  }
  
  async function deleteQuoteHandler(id) {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let res = await axios.delete(`${URL}/quotes/${id}` , {withCredentials: true});
        if (res.data.msg && res.data.msg == 'Please Login First') {
          navigate('/login');
          return;
        }
        toast.success("Your quote has been deleted successfully" , {
          transition: Slide
        });
        getQuotes();
      }
    })
  }

  return (
    <div className="animate__animated animate__fadeInUp">
      <li className={styles.quote}>
          <div>
              <p> {text} </p>
              <h3> {author} </h3>
          </div>
          <button onClick={()=> showQuoteHandler(id)}>
            <span> <BiDetail style={{position: 'relative' , bottom: '1.5px'}} /> </span>
             Full Quote
          </button>
          <LikeQuote likes={likes} id={id} getQuotes={getQuotes} />
          <ShareQuote id={id} />

          {userOnly &&
            <div>
              <span onClick={()=> editQuoteHandler(id)} className={styles["edit"]}> <FaRegEdit /> </span>
              <span onClick={()=> deleteQuoteHandler(id)} className={styles["delete"]}> <FaTrashAlt /> </span>
            </div>
          } 
            
          
      </li>
    </div>
  )
}

export default Quote