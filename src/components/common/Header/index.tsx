import React from "react";
import styled from "styled-components";
import Gameface from "./Gameface";

const Container = styled.div`
  margin: 2rem auto;
  width: 600px;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <div>score</div>
      <Gameface />
      <div>timee</div>
    </Container>
  );
};

export default Header;
