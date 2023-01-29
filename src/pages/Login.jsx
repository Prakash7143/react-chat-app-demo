import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from '../firebase.config';

const Login = () => {


  const [error, setError] = useState({
    code: '',
    message: '',
  });
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const EMAIL = e.target[0].value;
    const PASSWORD = e.target[1].value;

    try {
      const response = await signInWithEmailAndPassword(AUTH, EMAIL, PASSWORD);
      
      response && navigate('/');
       

    } catch (error) {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setError({
          code: error.code,
          message: error.message
        });
        // console.log(errorCode, errorMessage);
      
    };
  }


  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">ChatApp</span>
            <span className="title">Login</span>
            <form onSubmit={handleLogin}>
                <input type="email" className="" placeholder="Email"/>
                <input type="password" className="" placeholder="Password"/>
               
                <button>Login</button>
                {error.code && (
                  <React.Fragment>
                    <h4>{error.code}</h4>
                    <p> {error.message}</p>
                  </React.Fragment>
                )}
            </form>
            <p>Dont have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login