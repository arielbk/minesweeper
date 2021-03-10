import styled from '@emotion/styled';
import React from 'react';
import { FaBomb } from 'react-icons/fa';
import { MdFlag } from 'react-icons/md';

const CellButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #eee;
  outline: 0;
  color: red;
  font-size: 18px;

  &:active {
    box-shadow: inset 4px 4px 8px #999;
    background: #bbb;
    outline: 0;
  }
`;

const CellLabel = styled.div<{ isMine: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${({ isMine }) => (isMine ? 'red' : '#777')};
  color: ${({ isMine }) => (isMine ? '#000' : '#fff')};
`;

interface Props {
  isRevealed: boolean;
  value: string;
  onSelectCell: () => void;
  isFlagged: boolean;
  onFlagCell: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Cell: React.FC<Props> = ({
  isRevealed,
  value,
  onSelectCell,
  isFlagged,
  onFlagCell,
}) => {
  let label: any = value;
  if (value === 'M') label = <FaBomb />;
  if (value === '0') label = '';
  return isRevealed ? (
    <CellLabel isMine={value === 'M'}>{label}</CellLabel>
  ) : (
    <CellButton onContextMenu={onFlagCell} onClick={onSelectCell}>
      {isFlagged ? <MdFlag /> : ''}
      {process.env.REACT_APP_DEBUG_MODE ? label : ''}
    </CellButton>
  );
};

export default Cell;
