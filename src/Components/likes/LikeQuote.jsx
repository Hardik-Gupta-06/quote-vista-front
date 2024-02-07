import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { URL } from '../url';

const LikeQuote = ({likes , id , getQuotes}) => {

    let [isLiked , setIsLiked] = useState(false);
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user ? user.id : null;
    let navigate = useNavigate();

    useEffect(() => {
        if (userId == null) {
            return;
        }
        if (likes.includes(userId)) {
            setIsLiked(true);
        }
    } , []);

    async function likeHandler(id) {
        let res = await axios.patch(`${URL}/like/${id}` , {userId} , {withCredentials: true});
        if (res.data.msg && res.data.msg == 'Please Login First') {
            navigate('/login');
            return;
        }
        setIsLiked(true);
        getQuotes();
    }

    async function unlikeHandler(id) {
        let res = await axios.patch(`${URL}/unlike/${id}` , {userId} , {withCredentials: true});
        if (res.data.msg && res.data.msg == 'Please Login First') {
            navigate('/login');
            return;
        }
        setIsLiked(false);
        getQuotes();
    }

    function handleClick() {
        if (isLiked) {
            unlikeHandler(id);
        }
        else {
            likeHandler(id);
        }
    }

    return (
        <button onClick={handleClick}>
            {isLiked ?
                <span style={{color: 'red'}}> <IoIosHeart style={{position: 'relative' , bottom: '1.5px'}} /> </span>
            :
                <span style={{color: 'red'}}> <IoIosHeartEmpty style={{position: 'relative' , bottom: '1.5px'}} /> </span>

            }
            {likes.length}
            &nbsp;
            Likes
        </button>
    )
}

export default LikeQuote