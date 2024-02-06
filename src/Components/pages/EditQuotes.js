import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditQuotes.module.css";
import { Slide, toast } from "react-toastify";
import { URL } from "../url";

const EditQuotes = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  let [nameState, setNameState] = useState();
  let [quoteState, setQuoteState] = useState();

  async function quoteHandler() {
    let res = await axios.get(`${URL}/quotes/${id}`, {
      withCredentials: true,
    });
    if (res.data.msg && res.data.msg == "Please Login First") {
      navigate("/login");
      return;
    }
    let { author, text } = res.data;
    setNameState(author);
    setQuoteState(text);
  }

  async function editQuoteHandler(event) {
    event.preventDefault();
    let author = nameState;
    let text = quoteState;
    let res = await axios.patch(
      `${URL}/quotes/${id}/edit`,
      {
        author,
        text,
      },
      { withCredentials: true }
    );
    if (res.data.msg && res.data.msg == "Please Login First") {
      navigate("/login");
      return;
    }
    toast.success("Your quote has been edited successfully" , {
      transition: Slide
    });
    navigate("/");
  }

  useEffect(() => {
    quoteHandler();
  }, []);

  return (
    <div>
      <h1> Edit Quote </h1>
      <div class="animate__animated animate__fadeInUp">
        <form onSubmit={editQuoteHandler} className={styles["edit-quote-form"]}>
          <div className="mb-3">
            <label htmlFor="author" className="form-label"> Author: </label>
            <input
              onChange={(e) => {
                setNameState(e.target.value);
              }}
              type="text"
              id="author"
              value={nameState}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quote" className="form-label"> Quote: </label>
            <textarea
              onChange={(e) => {
                setQuoteState(e.target.value);
              }}
              id="quote"
              value={quoteState}
              className="form-control"
              rows={4}
              cols={15}
              maxLength={200}
            ></textarea>
          </div>
          <button> Submit </button>
        </form>
      </div>
    </div>
  );
};

export default EditQuotes;
