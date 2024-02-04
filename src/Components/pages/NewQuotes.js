import React, { useEffect, useRef } from "react";
import styles from "./NewQuotes.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

const NewQuotes = () => {
  let nameRef = useRef();
  let quoteRef = useRef();
  let navigate = useNavigate();

  async function addQuoteHandler(event) {
    event.preventDefault();
    const author = nameRef.current.value;
    const text = quoteRef.current.value;
    try {
      let res = await axios.post("http://localhost:8080/addquotes", {
        author,
        text,
      } , {withCredentials: true});
      console.log(res);
      if (res.data.msg && res.data.msg == 'Please Login First') {
        navigate('/login');
        return;
      }
      toast.success("Your quote has been uploaded successfully" , {
        transition: Slide
      });
      navigate("/");
    } catch (e) {
      console.log("cannot create new quote");
    }
  }

  // useEffect(()=> {
  //   if (!user.email) {
  //     navigate('/login');
  //   }
  // } , [])

  return (
    <div>
      <h1> Add Quote </h1>
      <div className="animate__animated animate__fadeInUp">
        <form onSubmit={addQuoteHandler} className={styles["new-quote-form"]}>
          <div className="mb-3">
            <label htmlFor="author" className="form-label"> Author: </label>
            <input
              ref={nameRef}
              type="text"
              id="author"
              placeholder="Author's name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quote" className="form-label"> Quote: </label>
            <textarea
              ref={quoteRef}
              id="quote"
              cols={15}
              rows={4}
              maxLength={200}
              placeholder="Author's quote"
              className="form-control"
            ></textarea>
          </div>
          <button> Submit </button>
        </form>
      </div>
    </div>
  );
};

export default NewQuotes;
