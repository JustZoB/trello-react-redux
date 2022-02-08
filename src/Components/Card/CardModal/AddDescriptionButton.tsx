import React from 'react';
import styled from 'styled-components';

export const AddDescriptionButton: React.FC<Props> = ({description, onClick}) => {
  return (
    <StyledAddDescriptionButton
      onClick={onClick}
    >
      {description ? description : 'Add description...'}
    </StyledAddDescriptionButton>
  );
}

const StyledAddDescriptionButton = styled.div`
  font-size: 14px;
  width: calc(100% - 20px);
  background-color: #EEEEEE;
  padding: 10px;
  height: 40px;
  cursor: pointer;
  margin: 10px 0 0;
  border-radius: 3px;

  &:hover {
    background-color: #DDDDDD;
  }
`

interface Props {
  description?: string,
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
}
