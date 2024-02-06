import axios from 'axios';
import React,{ useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import {Slide , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../url';

const Login = ({userHandler}) => {
    let mailRef = useRef();
    let passRef = useRef();

    let navigate = useNavigate();

    async function formHandler(e) {
        e.preventDefault();
        let email = mailRef.current.value;
        let password = passRef.current.value;
        try {
            let res = await axios.post(`${URL}/login` , {email , password} , {withCredentials: true});
            if (res.data.msg == 'Create your account first') {
                toast.error("Either your email or password is incorrect");
                navigate('/login');
            }
            else if (res.data.msg == 'Incorrect password') {
                toast.error("Either your email or password is incorrect");
                navigate('/login');
            }
            else {
                localStorage.setItem('user' , JSON.stringify(res.data));
                userHandler(res.data);
                toast.success("Logged in successfully" , {
                    transition: Slide
                });
                navigate('/');
            }
        }
        catch(err) {
            console.log(err);
        }
    }

  return (
    <div>
        <h1> Login Credentials </h1>
        <div className="animate__animated animate__fadeInUp">
            <form onSubmit={formHandler} className={styles["login"]}>

                <div className='mb-3'>
                    <label htmlFor="email" className='form-label'> Email : </label>
                    <input ref={mailRef} type="email" id="email" placeholder='Enter email id' className='form-control'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor="password" className='form-label'> Password : </label>
                    <input ref={passRef} type="password" id="password" placeholder='Enter password' className='form-control'/>
                </div>

                <button> Login </button>
                <p> if you don't have an account , <Link to='/signup'> Create account </Link> </p>

            </form>
        </div>
    </div>
  )
}

export default Login