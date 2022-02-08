import React from 'react';
import styled from 'styled-components';

export const Button: React.FC<Props> = ({label, size, type, onClick}) => {
  return (
    <StyledButton
      label={label}
      type={type}
      size={size}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
}

const StyledButton = styled.button<Props>`
  border-radius: 3px;
  background-color: #0079bf;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => (props.size === 'small' ? '2px 5px;' : '5px 10px;')};
  cursor: pointer;
  margin-right: 5px;
  border: 0;

  &:hover {
    background-color: #026aa7;
  }

  &:active {
    background-color: #055a8c;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
`

interface Props {
  label: string,
  size?: 'small' | 'big' | undefined,
  type?: 'button' | 'submit' | 'reset' | undefined,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
