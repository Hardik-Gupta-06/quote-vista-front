import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Quote from '../Quote/Quote';
import styles from './AllQuotes.module.css';
import Loader from '../spinner/Loader';
import { URL } from '../url';

const AllQuotes = () => {

  let [quotes , setQuotes] = useState([]);
  let [isLoading , setIsLoading] = useState(true);

  async function getQuotes() {
      let res = await axios.get(`${URL}/allquotes` , {withCredentials: true});
      setQuotes(res.data);
      setIsLoading(false);
  }

  useEffect( ()=> {
      getQuotes();
  } , [])






  return (
      <div className={styles["all-quotes"]}>
          <h1> All Quotes </h1>
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
                      userOnly={false}
                  />
                })
              }
  
            </section>
          }
      </div>
  )
}

export default AllQuotes