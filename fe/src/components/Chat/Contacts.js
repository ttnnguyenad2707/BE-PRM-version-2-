import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { allContactsRoute, allUsersRoute } from "../../services/conversation.service";
import styled from "styled-components";
import axios from "axios";

export default function Contacts({ changeChat }) {
  const [user] = useOutletContext();
  const [allUser, setAllUser] = useState([]);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState("");
  const [contacts, setContacts] = useState([]);


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
    async function fetchData() {
      try {
        setCurrentUserName(user?.lastname);
      } catch (error) {
        console.log("Lỗi khi lấy tên người dùng");
      }
    }
    fetchData();
  }, [user]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleUserSelect = async (event) => {
    const selectedUserId = event.target.value;
    setSelectedUser(selectedUserId);
    const selectedUser = allUser.find((user) => user._id === selectedUserId);
    if (selectedUser) {
      changeChat(selectedUser);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const data = await axios.get(`${allContactsRoute}/${user?._id}`);
          setContacts(data.data);
          // console.log("contact123: " + contacts);
        } catch (error) {
          console.log("k lay dc contact");
        }
      }
    }

    fetchData();
  }, [user, contacts]);


  return (
    <>
      {allUser.length > 0 && (
        <Container>
          <div className="brand">
            <h3>Contacts</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact.lastname}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`


  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #fae9d5;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #e66c4e;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #fae9d5;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #fae9d5;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #e66c4e;
        }
      }
      
    }
    .selected {
      background-color: #e66c4e;
      .username {
        h3{
          color: white;
        }
      }
    }
    
  }
  .contact:hover {
    background-color: #e66c4e;
    .username {
      h3{
        color: white;
      }
    }
  }


  .current-user {
    background-color: #e66c4e;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
