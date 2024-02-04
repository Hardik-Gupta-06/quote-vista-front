import React, { useState } from 'react'
import { FaShare } from "react-icons/fa";
import Modal from 'react-modal';
import {WhatsappIcon , WhatsappShareButton , LinkedinIcon , LinkedinShareButton , XIcon , TwitterShareButton , TelegramIcon , TelegramShareButton , FacebookIcon , FacebookShareButton} from 'react-share';
import { IoClose } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import './ShareQuote.css';
import { Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ShareQuote = ({id}) => {

    let [open , setOpen] = useState(false);

    let navigate = useNavigate();

    function handleOpen() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setOpen(true);
        }
        else {
            navigate('/login');
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            backgroundColor: '#1a1625',
            // backgroundColor: 'black',
            padding: '15px',
            // border: '1px solid #ccc',
            border: '1px solid #a688fa',
            animation: 'fadeIn 0.5s ease'
        },
        overlay: {
            zIndex: '20',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
    }

    const shareUrl = `http://localhost:3000/quotes/${id}`;
    // const shareUrl = `${window.location.origin}/quote/${id}`;

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Link has been copied to clipboard" , {
                transition: Slide
            })
        }
        catch(e) {
            toast.error("Link cannot be copied to clipboard");
        }

    }


  return (
    <span>
        <button onClick={ handleOpen }>
            <span> <FaShare style={{position: 'relative' , bottom: '1.5px'}} /> </span>
            Share
        </button>
        <Modal
            isOpen = {open}
            style={customStyles}
            onRequestClose={() => { setOpen(false) }}
        >
            <div className='share'>
                Share
                <span onClick={() => { setOpen(false) }}> <IoClose /> </span>

                <br /> <br />
                <p> Share on social media </p>

                <div className='icons'>
                    <WhatsappShareButton url={shareUrl} className='app'>
                        <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>

                    <LinkedinShareButton url={shareUrl} className='app'>
                        <LinkedinIcon size={40} round={true} />
                    </LinkedinShareButton>

                    <TwitterShareButton url={shareUrl} className='app'>
                        <XIcon size={40} round={true} />
                    </TwitterShareButton>

                    <TelegramShareButton url={shareUrl} className='app'>
                        <TelegramIcon size={40} round={true} />
                    </TelegramShareButton>

                    <FacebookShareButton url={shareUrl} className='app'>
                        <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>
                </div>

                <hr />

                <br />
                <p> Copy the link directly </p>

                <section>
                    <input type="text" value={shareUrl} readOnly />
                    <span onClick={handleCopy}> <LuCopy /> </span>
                </section>
            </div>
        </Modal>
    </span>
  )
}

export default ShareQuote