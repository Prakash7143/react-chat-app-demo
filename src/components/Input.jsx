import React, { useContext, useState } from 'react'
import Avatar from '../assets/avatar.svg';
import Points from '../assets/points.svg';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { v4 as uuid } from 'uuid';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { DB, STORAGE } from '../firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
    console.log('text', text);
    console.log(img);

    if (img) {
      const storageRef = ref(STORAGE, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(DB, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            })
          });
         
        });
      }

    );

    }else {
      if (text !== ""){
        await updateDoc(doc(DB, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          })
        });
      }
    }
    if (text !== ""){
      await updateDoc(doc(DB, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp()
      });
      await updateDoc(doc(DB, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp()
      });
    }

    setText("");
    setImg(null);
  
  }

  return (
    <div className='input'>
      <input type="text" value={text} placeholder="type here.." onChange={e => setText(e.target.value)}/>
      <div className="send">
        <img src={Points} alt="chat" />
        <input type="file" style={{display: "none"}} id="file"  onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Avatar} alt="ile" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  )
}

export default Input