import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'

import Video from '../assets/video.svg';
import Picture from '../assets/picture.svg';
import User from '../assets/add-user.svg';
import { ChatContext } from '../contexts/ChatContext';
import { Link } from 'react-router-dom';

const Chat = () => {

  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <Link to="/pay"><img src={Video} alt="ic 1" /></Link>
          <img src={Picture} alt="ic 2" />
          <img src={User} alt="ic 3" />
        </div>
      </div>
      {
        data.user.displayName !== "" ? (
          <React.Fragment>
            <Messages/>
              <Input/>
          </React.Fragment>
        ): (
          <h1>Select a User to Chat with</h1>
        )
      }
    </div>
  )
}

export default Chat