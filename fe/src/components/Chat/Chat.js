import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allContactsRoute, allUsersRoute, host } from "../../services/conversation.service";
import ChatContainer from "../Chat/ChatContainer";
import Contacts from "../Chat/Contacts";
import Welcome from "../Chat/Welcome";

export default function Chat() {

  const [user] = useOutletContext();
  // console.log("user: " + user?._id);
  // const navigate = useNavigate();
  const socket = useRef();
  // const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [allUser, setAllUser] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        setCurrentUser(user);
      } catch (error) {
        console.log("loi lay user");
      }
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const response = await axios.get(`${allUsersRoute}/${user?._id}`);
          setAllUser(response.data);
        } catch (error) {
          console.log("Không thể lấy danh sách người dùng");
        }
      }
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    const idu = localStorage.getItem('chatid');
    const selectedUser = allUser.find((user) => user._id === idu);
    if (selectedUser != undefined) {
      localStorage.removeItem('chatid');
      setCurrentChat(selectedUser);
    }

  }, [allUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser?._id);
      // console.log("currentUserIO: " + currentUser?._id);
    }
  }, [currentUser]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    // console.log("currentChat"+ currentChat);
  };

  return (
    <>
      <Container>
        <div className="container" style={{ overflow: 'hidden' }}>
          <Contacts changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );

}

const Container = styled.div`

  border-top: 5px solid #e66c4e;
  height: 87vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f7efe5;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #f7efe5;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
