import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {createOne,getOne,updateOne} from '../../services/conversation.service'
import { useNavigate, useOutletContext } from "react-router-dom";
const socket = io('http://localhost:5001'); // Thay đổi URL tới địa chỉ của server của bạn

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [conversationId, setConversationId] = useState(''); // ID của cuộc trò chuyện
  const [user] = useOutletContext();
  const user22="65300bc301afe25a77b24074"
  useEffect(() => {
    // Gửi yêu cầu để tạo hoặc lấy cuộc trò chuyện giữa hai người dùng
    const fetchOrCreateConversation = async () => {
      const data={
        user1:user._id,
        user2:user22
      }
      createOne(data).then((res)=>{
        setConversationId(res.data._id)
      });
    };
    fetchOrCreateConversation();
  }, []);

  useEffect(() => {
    // Gửi sự kiện 'join' để tham gia vào cuộc trò chuyện cụ thể khi component mount
    socket.emit('join', conversationId);

    // Lấy lịch sử tin nhắn giữa hai người dùng từ server
    const fetchMessages = async () => {
      const user1 = user._id; // Thay đổi tên người dùng nếu cần thiết
      const user2 = user22; // Thay đổi tên người dùng nếu cần thiết
      getOne(user1,user2).then((res)=>{
        setMessages(res.data.messages)
      })
    };
    fetchMessages();

    // Lắng nghe sự kiện 'chat message' từ server
    socket.on('chat message', (data) => {
      setMessages(data.messages);
    });
  }, [conversationId]);

  const sendMessage = async () => {
    // Gửi tin nhắn tới server
    var data={
        text:message,
        // sender:"653012298669bd5d3590bf47"
        sender:user._id
    }
    updateOne(conversationId,data)
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg.text}</p>
            <p>{msg.sender}</p>
            <p>{msg.timestamp}</p>
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
