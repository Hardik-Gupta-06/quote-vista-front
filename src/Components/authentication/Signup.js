import axios from 'axios';
import React,{ useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import { Slide, toast } from 'react-toastify';

const Signup = () => {

    let nameRef = useRef();
    let mailRef = useRef();
    let passRef = useRef();

    let navigate = useNavigate();

    async function formHandler(e) {
        e.preventDefault();
        let username = nameRef.current.value;
        let email = mailRef.current.value;
        let password = passRef.current.value;
        try {
            let res = await axios.post('http://localhost:8080/signup' , {username , email , password} , {withCredentials: true});
            if (res.data.msg == 'This mail is already registered') {
                // console.log(res.data.msg);
                toast.error("This email id is already in use");
                navigate('/signup');
            }
            else {
                toast.success("Account has been created successfully" , {
                    transition: Slide
                });
                navigate('/login');
            }
        }
        catch(err) {
            console.log(err);
        }
    }

  return (
    <div>
        <h1> Create Account </h1>
        <div class="animate__animated animate__fadeInUp">
            <form onSubmit={formHandler} className={styles["signup"]}>
                <div className='mb-3'>
                    <label htmlFor="username" className='form-label'> Username : </label>
                    <input ref={nameRef} type="text" id="username" placeholder='Enter username' className='form-control'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'> Email : </label>
                    <input ref={mailRef} type="email" id="email" placeholder='Enter email id' className='form-control'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'> Password : </label>
                    <input ref={passRef} type="password" id="password" placeholder='Enter password' className='form-control'/>
                </div>

                <button> Sign up </button>
                <p> if already having an account ,  <Link to='/login'> Please Login </Link> </p>

            </form>
        </div>
    </div>
  )
}

export default Signup