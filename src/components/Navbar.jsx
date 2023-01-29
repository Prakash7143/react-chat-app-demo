import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AUTH } from '../firebase.config'
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className="logo">ChatApp</span>
      <div className="user">
        <img src={currentUser.photoURL || "https://images.pexels.com/photos/12826233/pexels-photo-12826233.jpeg?auto=compress&cs=tinysrgb&w=800"} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(AUTH)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar