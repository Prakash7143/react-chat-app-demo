import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../contexts/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { DB } from '../firebase.config';

const Messages = () => {
  const [messages, setMessages] = useState(null);
  const { data } = useContext(ChatContext);

  useEffect(() => {

    const getChatsWithUser = () => {
      const unsub = onSnapshot(doc(DB, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
  
      return () => {
        unsub();
      }
    }

    data.chatId && getChatsWithUser();

  }, [data.chatId]);


  return (
    <div className='messages'>
      {
        messages?.map(msg => (
            <Message message={msg} key={msg.id} />
        ))
      }
        
    </div>
  )
}

export default Messages