import React from 'react';
import styled from 'styled-components';

export const TextInput: React.FC<Props> = (props) => {
  return (
    <Input
      {...props}
    />
  );
}

const Input = styled.input`
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 5px;
  width: 310px;
`

interface Props {
  type?: 'text' | 'password' | 'email' | 'search' | undefined,
  name?: string,
  placeholder?: string,
  value?: string,
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
}
