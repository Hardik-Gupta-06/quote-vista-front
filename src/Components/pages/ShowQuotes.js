import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './ShowQuotes.module.css';
import LikeQuote from '../likes/LikeQuote';
import Loader from '../spinner/Loader';

const ShowQuotes = () => {

    let navigate = useNavigate();

    let params = useParams();
    let [quote , setQuote] = useState({});
    let [isLoading , setIsLoading] = useState(true);

    async function fetchQuote() {
        let res = await axios.get(`http://localhost:8080/quotes/${params.id}` , {withCredentials: true});
        if (res.data.msg && res.data.msg == 'Please Login First') {
            navigate('/login');
            return;
        }
        // let {author , text} = res.data;
        setQuote(res.data);
        setIsLoading(false);
    }

    useEffect( ()=> {
        fetchQuote();
    },[])

  return (
    <div>
        <div className={styles["full-quote"]}>
            <h1> Full Quote </h1>
            {isLoading ?
                <Loader />
                :
                <section className="animate__animated animate__fadeInUp">
                    <p> {quote.text} </p>
                    <h3> {quote.author} </h3>
                    {quote.likes &&
                        <LikeQuote likes={quote.likes} id={quote._id} getQuotes={fetchQuote} />
                    }
                </section>
            }
        </div>
    </div>
  )
}

export default ShowQuotes