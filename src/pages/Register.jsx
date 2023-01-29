import React, { useState } from 'react';
import Avatar from '../assets/avatar.svg';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AUTH, DB, STORAGE } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

  const [error, setError] = useState({
    code: '',
    message: '',
  });
  const navigate = useNavigate();


  const handleRegistration = async (e) => {
    e.preventDefault();
    const USERNAME = e.target[0].value;
    const EMAIL = e.target[1].value;
    const PASSWORD = e.target[2].value;
    const FILE = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(AUTH, EMAIL, PASSWORD);
      const storageRef = ref(STORAGE, USERNAME);

      const uploadTask = uploadBytesResumable(storageRef, FILE);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('Nothing to upload');
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await updateProfile(response.user, {
            displayName: USERNAME,
            photoURL: downloadURL
          })
           // TO DATABASE
          await setDoc(doc(DB, "users", response.user.uid), {
            uid: response.user.uid,
            displayName: USERNAME,
            photoURL: downloadURL,
            email: EMAIL
          });

          await setDoc(doc(DB, "userChats", response.user.uid), {});
          alert('User created successfully');
          navigate('/');
        });
      }

    );

    } catch (error) {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setError({
          code: error.code,
          message: error.message
        });
        // console.log(errorCode, errorMessage);
      
    };

    // createUserWithEmailAndPassword(AUTH, EMAIL, PASSWORD)
    // .then((userCredential) => {
    //   // Signed in 
    //   const user = userCredential.user;
    //   console.log(user);
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode, errorMessage);
    //   // ..
    // });

  }

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">ChatApp</span>
            <span className="title">Register</span>
            <form onSubmit={handleRegistration}>
                <input type="text" className="" placeholder="Name"/>
                <input type="email" className="" placeholder="Email"/>
                <input type="password" className="" placeholder="Password"/>
                <input style={{display: "none"}} type="file" id="file" />
                <label htmlFor="file">
                    <img src={Avatar} alt="Avatar" />
                    <span>Avatar</span>
                </label>
                <button>Signup</button>

                {error.code && (
                  <React.Fragment>
                    <h4>{error.code}</h4>
                    <p> {error.message}</p>
                  </React.Fragment>
                )}
            </form>
            <p>You do have an account? <Link to="/login"> Login </Link></p>
        </div>
    </div>
  )
}

export default Register