import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';

const Container = styled.div`
  display: block;
  text-align: center;
`;

const Settings: React.FC = () => {
  const {
    gridWidth,
    setGridDimensions,
    startTime,
    isDead,
    isWinner,
  } = useContext(GameContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDimensions = Number(e.target.value);
    setGridDimensions(newDimensions);
  };

  if (!startTime && !isDead && !isWinner) return <div />;
  return (
    <Container>
      <label htmlFor="grid-dimensions">Grid dimensions: </label>
      <select
        name="grid-dimensions"
        value={gridWidth}
        id="grid-dimensions"
        onChange={handleChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
      </select>
    </Container>
  );
};

export default Settings;
