import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "contexts/GameContext";
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
  const { flagCount } = useContext(GameContext);
  return (
    <Container>
      <div>{flagCount}</div>
      <Gameface />
      <div>timee</div>
    </Container>
  );
};

export default Header;
