import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../assets/images/robot.gif";
import { useNavigate, useOutletContext } from "react-router-dom";
export default function Welcome() {
  const [user] = useOutletContext();
  console.log("user: " + user?._id);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (user)
      setUserName(user?.lastname);
  }, [user]);

  useEffect(() => {
    // Log giá trị mới của userName sau khi nó đã thay đổi
    console.log("name: " + JSON.stringify(user?.lastname));
  }, [user]);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #e66c4e;
    font-weight: bold;
  }
  h1,h3{
    color: #e66c4e;
  }
`;
