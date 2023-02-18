import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement, useContext } from 'react';
import { FaBomb } from 'react-icons/fa';
import { MdFlag } from 'react-icons/md';

export const numberColors = [
  '#ccc',
  '#00EEFD',
  '#72FF4F',
  '#FF9944',
  '#00b7ff',
  '#eb3939',
  '#e16aee',
  '#ffd500',
];

const Container = styled.div`
  position: relative;
  border-radius: 2px;
  overflow: hidden;
`;

const CellButton = styled(motion.button)`
  position: absolute;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  outline: 0;
  color: red;
  font-family: 'Courier New', Courier, monospace;

  &:active,
  &:focus {
    box-shadow: inset 4px 4px 8px #999;
    background: #bbb;
    outline: 0;
  }
`;

const CellLabel = styled.div<{ value: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ value }) => (value === 'M' ? 'red' : '#777')};
  color: ${({ value }) =>
    value === 'M' ? '#000' : numberColors[parseInt(value)]};
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

interface Props {
  fontSize: number;
  isRevealed: boolean;
  value: string;
  onSelectCell: () => void;
  isFlagged: boolean;
  onFlagCell: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  distanceFromLastSelected: number;
}

const Cell: React.FC<Props> = ({
  fontSize,
  isRevealed,
  value,
  onSelectCell,
  isFlagged,
  onFlagCell,
  distanceFromLastSelected,
}) => {
  const { isFlagMode } = useContext(GameContext);
  let label: string | ReactElement = value;
  if (value === 'M') label = <FaBomb />;
  if (value === '0') label = '';

  return (
    <Container>
      <AnimatePresence custom={distanceFromLastSelected}>
        {!isRevealed && (
          <CellButton
            custom={distanceFromLastSelected}
            variants={variants}
            initial="default"
            exit="exit"
            style={{ fontSize }}
            onContextMenu={onFlagCell}
            onClick={(e) =>
              isFlagMode || e.shiftKey ? onFlagCell(e) : onSelectCell()
            }
          >
            {isFlagged ? <MdFlag /> : ''}
            {process.env.REACT_APP_DEBUG_MODE ? label : ''}
          </CellButton>
        )}
      </AnimatePresence>
      <CellLabel style={{ fontSize }} value={value}>
        {label}
      </CellLabel>
    </Container>
  );
};

const variants = {
  default: { scale: 1 },
  exit: (distance: number) => ({
    scale: 0,
    rotate: 360,
    transition: {
      duration: 0.1,
      delay: 0.05 * distance,
    },
  }),
};

export default Cell;
