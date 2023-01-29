import React, { useContext, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { DB } from '../firebase.config';
import { AuthContext } from '../contexts/AuthContext';


const Search = () => {

  const { currentUser } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [actualUser, setActualUser] = useState(null);
  const [hasErr, setHasErr] = useState(false);

  const handleSearch = async () => {
    const usersRef = collection(DB, "users");
    const q = query(usersRef, where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setActualUser(doc.data())
      });

    } catch (error) {
      setHasErr(error);
    };

  }

  const handleKeyDown = (e) => {
    e.code === "Enter" &&  handleSearch();
  }

  const handleSelect = async () => {
    // check whether the group (chats in firestore) exists, if not exists
    const combinedId = 
    currentUser.uid > actualUser.uid 
      ? currentUser.uid + actualUser.uid 
      : actualUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(DB, "chats", combinedId));

      if (!res.exists()) {
        // create a chat in "chats" collection
        await setDoc(doc(DB, "chats", combinedId), { messages: [] });

        await updateDoc(doc(DB, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: actualUser.uid,
            displayName: actualUser.displayName,
            photoURL: actualUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp(),
        });

        await updateDoc(doc(DB, "userChats", actualUser.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp(),
        });

        // create user chats
        // userChats: {
        //   theChatPersonsId: {
        //     combinedId: {
        //       userInfo{
        //         displayName, image, id
        //       },
        //       lastMessage: "",
        //       date: ""
        //     }
        //   }
        // }

      }

    } catch (error) {
      console.log(error);
      setHasErr(error);
    }

    setActualUser(null);
    setUserName("");

  }


  return (
    <div className='search'>
      <div className='searchForm'>
          <input onKeyDown={handleKeyDown} value={userName} onChange={e => setUserName(e.target.value)} placeholder='search a user..' type="text" />
      </div>
      {actualUser && (
          <div className="userChat" onClick={handleSelect}>
            {/* https://images.pexels.com/photos/12826233/pexels-photo-12826233.jpeg?auto=compress&cs=tinysrgb&w=800 */}
            <img src={actualUser.photoURL} alt="User pic" />
            <div className="userChatInfo">
              <span>{actualUser.displayName}</span>
            </div>
          </div>
        )}
      {hasErr && ( <p>Something went wrong!!</p> )}
    </div>
  )
}

export default Search