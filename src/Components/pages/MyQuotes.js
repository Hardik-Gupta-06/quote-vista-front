import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Quote from '../Quote/Quote';
import { useNavigate } from 'react-router-dom';
import styles from './MyQuotes.module.css';
import Loader from '../spinner/Loader';
import { URL } from '../url';

const MyQuotes = () => {

  let [quotes , setQuotes] = useState([]);
  let [isLoading , setIsLoading] = useState(true);

  let navigate = useNavigate();

  async function getQuotes() {
      let res = await axios.get(`${URL}/myquotes` , {withCredentials: true});
      if (res.data.msg && res.data.msg == 'Please Login First') {
        navigate('/login');
        return;
      }
      setQuotes(res.data);
      setIsLoading(false);
  }

  useEffect( ()=> {
      getQuotes();
  } , [])






  return (
    <div className={styles["my-quotes"]}>
        <h1> My Quotes </h1>
        {isLoading ?
          <Loader />
          :
          <section>
            {
              quotes.map((quote , index)=> {
                return <Quote 
                    key={index}
                    author={quote.author}
                    text={quote.text}
                    id={quote._id}
                    likes={quote.likes}
                    getQuotes={getQuotes}
                    userOnly={true}
                />
              })
            }

          </section>
        }
    </div>
  )
}

export default MyQuotes