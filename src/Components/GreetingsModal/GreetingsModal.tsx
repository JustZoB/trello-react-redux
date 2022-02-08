import React from 'react';
import { useState } from 'react';
import { TextInput } from '../TextInput';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { Form } from '../Form/Form';

export const GreetingsModal: React.FC<Props> = ({onSubmit}) => {
  const [modalActive, setModalActive] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e.currentTarget.userName.value)
    setModalActive(false)
  }

  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(e.currentTarget.value)
      setModalActive(false)
    }
  }

  return (
    <Modal $isActive={modalActive} size='small'>
      <h4>Hello and welcome to trello clone, enter you name:</h4>
      <Form onSubmit={handleSubmit}>
        <TextInput
          name='userName'
          type='text'
          placeholder='Enter your name...'
          onKeyPress={handleKeywordEnter}
          autoFocus={true}
        />
        <Button type='submit' label='Enter' />
      </Form>
    </Modal>
  );
}

interface Props {
  onSubmit: (name: string) => void,
}
