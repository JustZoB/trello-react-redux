import React from 'react';
import styled from 'styled-components';

export const ErrorAlert: React.FC<Props> = ({errorContent}) => {
  return (
    <Error>
      {errorContent}
    </Error>
  );
}

const Error = styled.div`
  width: 315px;
  height: 20px;
  border-radius: 5px;
  background-color: #D5AAA8;
  color: #e94e49;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  padding: 5px 10px;
  margin-right: 5px;
  margin-top: 10px;
`

interface Props {
  errorContent?: string,
}
