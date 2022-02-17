import React from 'react';
import styled from 'styled-components';

export const DescriptionContent: React.FC<Props> = ({description, onClick}) => {
  return (
    <Content
      onClick={onClick}
    >
      {description}
    </Content>
  );
}

const Content = styled.div`
  font-size: 14px;
  width: calc(100% - 20px);
  background-color: white;
  padding: 10px;
  cursor: pointer;
  margin: 10px 0 0;
  border-radius: 3px;
`

interface Props {
  description?: string,
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
}
