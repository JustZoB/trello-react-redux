import React from 'react';
import { useState } from 'react';
import { TextInput } from '../TextInput';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { Form } from '../Form/Form';
import { useDispatch } from 'react-redux';
import { userNameSet } from '../../features/board/boardSlice';

export const GreetingsModal: React.FC = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const userName = e.currentTarget.userName.value
    e.preventDefault();
    dispatch(userNameSet({userName}))
    setModalActive(false)
  }

  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const userName = e.currentTarget.value
      e.preventDefault();
      dispatch(userNameSet({userName}))
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
