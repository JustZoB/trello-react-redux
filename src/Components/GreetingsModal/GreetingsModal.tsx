import React from 'react';
import { useState } from 'react';
import { TextInput } from '../TextInput';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { Form } from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { userNameSet } from '../../features/user/userSlice';
import { RootState } from '../../app/store';

export const GreetingsModal: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector( (state: RootState) => state.user.userName)
  const [modalActive, setModalActive] = useState<boolean>(userName === '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const newUserName = e.currentTarget.userName.value
    e.preventDefault();
    dispatch(userNameSet({userName: newUserName}))
    setModalActive(false)
  }

  const handleKeywordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newUserName = e.currentTarget.value
      e.preventDefault();
      dispatch(userNameSet({userName: newUserName}))
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
