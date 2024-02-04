import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Quote from '../Quote/Quote';
import styles from './AllQuotes.module.css';
import Loader from '../spinner/Loader';

const AllQuotes = () => {

  let [quotes , setQuotes] = useState([]);
  let [isLoading , setIsLoading] = useState(true);

  async function getQuotes() {
      let res = await axios.get('http://localhost:8080/allquotes' , {withCredentials: true});
      // console.log(res);
    //   if (res.data.msg && res.data.msg == 'Please Login First') {
    //     navigate('/login');
    //     return;
    //   }
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
                      // key={quote._id}
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