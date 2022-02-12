import React from 'react';
import { useState } from 'react';
import { TextInput } from '../TextInput';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { Field, withTypes } from 'react-final-form';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { userNameSet } from '../../features/user/userSlice';
import { RootState } from '../../app/store';

export const GreetingsModal: React.FC = () => {
  const dispatch = useDispatch();
  const userName = useSelector( (state: RootState) => state.user.userName)
  const [modalActive, setModalActive] = useState<boolean>(userName !== '');
  const { Form } = withTypes<{userName?: string}>()
  // const [modalActive, setModalActive] = useState<boolean>(userName === '');

  const onSubmit = (values: {userName?: string}) => {
    const newUserName = values.userName
    dispatch(userNameSet({userName: newUserName}))
    setModalActive(false)
  }

  const validate = (values: {userName?: string}) => {
    let errors = {};

    if (values.userName && values.userName.length < 5) {
      errors = {...errors, userName: 'Too short'}
    }

    return errors
  }

  return (
    <Modal $isActive={modalActive} size='small'>
      <h4>Hello and welcome to trello clone, enter you name:</h4>
      <Form
        onSubmit={(values: {userName?: string}) => {onSubmit(values)}}
        validate={validate}
        render={({ handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Field
              name='userName'
              render={({ input, meta }) => (
                <div>
                  <TextInput
                    {...input}
                    type='text'
                    placeholder='Enter your name...'
                    autoFocus={true}
                  />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
            <Button type='submit' label='Enter' />
          </StyledForm>
        )}
      />
    </Modal>
  );
}

export const StyledForm = styled.form`
  display: flex;
`
