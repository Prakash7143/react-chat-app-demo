import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { DB } from '../firebase.config';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';

const Chats = () => {

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(DB, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({
      type: "CHANGE_USER",
      payload: user
    })
  }



  return (
    <div className='chats'>

      {
        Object.entries(chats).sort((a,b) => b[1].date - a[1].date).map((chat) => (
          <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="User pic" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))
      }
      

    </div>
  )
}

export default Chats