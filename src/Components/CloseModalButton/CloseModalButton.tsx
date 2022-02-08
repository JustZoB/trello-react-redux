import React from 'react';
import styled from 'styled-components';

export const CloseModalButton: React.FC<Props> = ({onClick}) => {
  return (
    <StyledCloseModalButton onClick={onClick} />
  );
}

const StyledCloseModalButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  z-index: 102;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::before, &::after {
    content: '';
    display: block;
    position: absolute;
    width: 18px;
    height: 1.5px;
    background-color: black;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void,
}
