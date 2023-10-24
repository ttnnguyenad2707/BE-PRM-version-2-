import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../../services/conversation.service";
import ChatContainer from "../Chat/ChatContainer";
import Contacts from "../Chat/Contacts";
import Welcome from "../Chat/Welcome";



export default function Chat() {

  const [user] = useOutletContext();
  // console.log("user: " + user?._id);
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

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
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser?._id);
      // console.log("currentUserIO: " + currentUser?._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        try {
          const data = await axios.get(`${allUsersRoute}/${currentUser?._id}`);
          // console.log("data: " + data.data);
          setContacts(data.data);
          // console.log("contact: " + contacts);
        } catch (error) {
          console.log("k lay dc contact");
        }
      }
    }

    fetchData();
  }, [currentUser]);

  // useEffect(() => {
  //   if(contacts)
  //   console.log("contact: " + JSON.stringify(contacts[0]));
  // }, [contacts]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    // console.log("currentChat"+ currentChat);
  };

  return (
    <>
      <Container>
        <div className="container" style={{ overflow: 'hidden' }}>
          <Contacts contacts={contacts} changeChat={handleChatChange} />
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
  height: 87vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
