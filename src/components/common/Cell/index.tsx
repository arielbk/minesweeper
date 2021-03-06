import styled from '@emotion/styled';
import React, { ReactElement } from 'react';
import { FaBomb } from 'react-icons/fa';
import { MdFlag } from 'react-icons/md';

const numberColors = [
  '#fff',
  '#00EEFD',
  '#72FF4F',
  '#FF9944',
  '#00b7ff',
  '#eb3939',
  '#e16aee',
];

const CellButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ddd;
  outline: 0;
  color: red;
  font-family: 'Courier New', Courier, monospace;

  &:active {
    box-shadow: inset 4px 4px 8px #999;
    background: #bbb;
    outline: 0;
  }
`;

const CellLabel = styled.div<{ value: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${({ value }) => (value === 'M' ? 'red' : '#777')};
  color: ${({ value }) =>
    value === 'M' ? '#000' : numberColors[parseInt(value)]};
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
`;

interface Props {
  fontSize: number;
  isRevealed: boolean;
  value: string;
  onSelectCell: () => void;
  isFlagged: boolean;
  onFlagCell: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Cell: React.FC<Props> = ({
  fontSize,
  isRevealed,
  value,
  onSelectCell,
  isFlagged,
  onFlagCell,
}) => {
  let label: string | ReactElement = value;
  if (value === 'M') label = <FaBomb />;
  if (value === '0') label = '';
  return isRevealed ? (
    <CellLabel style={{ fontSize }} value={value}>
      {label}
    </CellLabel>
  ) : (
    <CellButton
      style={{ fontSize }}
      onContextMenu={onFlagCell}
      onClick={onSelectCell}
    >
      {isFlagged ? <MdFlag /> : ''}
      {process.env.REACT_APP_DEBUG_MODE ? label : ''}
    </CellButton>
  );
};

export default Cell;
