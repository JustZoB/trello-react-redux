import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { Button, ButtonsWrapper } from '../../Button/Button';
import { CloseButton } from '../../CloseButton';
import { CloseModalButton } from '../../CloseModalButton/CloseModalButton';
import { Textarea, TextareaHead } from '../../Textarea';
import { Modal } from '../../Modal';
import { AddDescriptionButton } from './AddDescriptionButton';
import { DescriptionContent } from './DescriptionContent';
import { CommentsContent } from './CommentsContent';
import { CommentType } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { cardDelete, cardDescriptionEdit, cardNameEdit, commentAdd } from '../../../features/board/boardSlice';
import { RootState } from '../../../app/store';

export const CardModal: React.FC<CardModalProps> = ({
    active,
    setActive: modalActive,
    cardId,
    columnId,
    colName,
    name,
    description,
    comments,
  }) => {
  const dispatch = useDispatch();
  const userName = useSelector( (state: RootState) => state.user.userName)
  const cardNameRef = useRef<HTMLTextAreaElement>(null)

  const [state, setState] = useState<{
    descriptionEditMode: boolean,
    newDescription: string,
    prevDescription: string,
    commentContent: string
  }>(
    {
      descriptionEditMode: false,
      newDescription: description !== undefined ? description : '',
      prevDescription: description !== undefined ? description : '',
      commentContent: '',
    }
  );

  const handleClickCloseModal = () => {
    setState({ ...state, prevDescription: state.newDescription})
    setState({ ...state, descriptionEditMode: false})
    modalActive(false)
  }

  const handleKeyPressEscapeCloseModal = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClickCloseModal()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPressEscapeCloseModal);

    return () => {
      window.removeEventListener("keydown", handleKeyPressEscapeCloseModal);
    }
  }, [handleKeyPressEscapeCloseModal])

  const handleClickOpenAddingDescription = () => {
    setState({ ...state, prevDescription: state.newDescription})
    setState({ ...state, descriptionEditMode: true})
  }

  const handleClickSaveDescription = () => {
    dispatch(cardDescriptionEdit({columnId, cardId, description: state.newDescription}))
    setState({ ...state, newDescription: state.newDescription})
    setState({ ...state, descriptionEditMode: false})
  }

  const handleKeywordSaveDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSaveDescription()
    }
  }

  const handleClickDontSaveDescription = () => {
    setState({ ...state, newDescription: state.prevDescription})
    setState({ ...state, descriptionEditMode: false})
  }

  const handleClickDeleteCard = () => {
    dispatch(cardDelete({columnId, cardId}))
    setState({ ...state, descriptionEditMode: false})
  }

  const handleClickAddComment = () => {
    dispatch(commentAdd({columnId, cardId, commentText: state.commentContent, userName}))
    setState({ ...state, commentContent: ''})
  }

  const handleKeywordAddComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickAddComment()
    }
  }

  const handleKeyPressBlurCardName = (e: React.KeyboardEvent<HTMLTextAreaElement | null>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      cardNameRef.current?.blur()
    }
  }

  return (
    <Modal
      $isActive={active}
      onClick={() => modalActive(false)}
    >
      <Header>
        <TextareaHead
          value={name}
          onChange={e => dispatch(cardNameEdit({columnId, cardId, newName: e.target.value}))}
          onKeyPress={handleKeyPressBlurCardName}
          textareaRef={cardNameRef}
        >
          {name}
        </TextareaHead>
        <p>in column {colName}</p>
      </Header>

      <Description>
        <h4>Description</h4>

        {state.newDescription && !state.descriptionEditMode &&
          <DescriptionContent
            description={state.newDescription}
            onClick={handleClickOpenAddingDescription}
          />
        }

        {!state.newDescription && !state.descriptionEditMode &&
          <AddDescriptionButton
            description={state.newDescription}
            onClick={handleClickOpenAddingDescription}
          />
        }

        {state.descriptionEditMode &&
          <AddDescriptionWrapper>
            <Textarea
              placeholder='Add description...'
              value={state.newDescription}
              onChange={e => setState({ ...state, newDescription: e.target.value})}
              onKeyPress={handleKeywordSaveDescription}
              autoFocus={true}
              onFocus={e => e.currentTarget.select()}
            />
            <ButtonsWrapper>
              <Button label='Save' onClick={handleClickSaveDescription} />
              <CloseButton onClick={handleClickDontSaveDescription} />
            </ButtonsWrapper>
          </AddDescriptionWrapper>
        }
        
      </Description>

      <Comments>
        <h4>Comments</h4>
        <AddCommentWrapper>
          <Textarea
            placeholder='Write comment...'
            value={state.commentContent}
            onChange={e => setState({ ...state, commentContent: e.target.value})}
            onKeyPress={handleKeywordAddComment}
          />
          <Button label='Post' onClick={handleClickAddComment} />
        </AddCommentWrapper>
        <CommentsContent
          columnId={columnId}
          cardId={cardId}
          comments={comments}
        />
      </Comments>

      <DeleteCardButtonWrapper>
        <Button label='Delete this card' onClick={handleClickDeleteCard} />
      </DeleteCardButtonWrapper>
      <CloseModalButton onClick={handleClickCloseModal} />
    </Modal>
  );
}

const Header = styled.div`
  margin-top: 10px;

  > textarea {
    margin: 0 0 0 5px;
    width: calc(100% - 60px);
  }

  > p {
    margin-left: 10px;
  }
`

const Description = styled.div`
  padding: 10px;

  Textarea {
    margin: 0 0 10px;
    height: 100px;
  }
`

const AddDescriptionWrapper = styled.div`
  display: block;
`

const Comments = styled.div`
  padding: 10px;
`

const AddCommentWrapper = styled.div`
  background-color: #EEEEEE;
  padding-bottom: 10px;

  Textarea {
    margin: 0;
    outline: 0;
  }

  Button {
    width: fit-content;
    margin-left: 10px;
  }
`

const DeleteCardButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 3px;
`

interface CardModalProps {
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  cardId: number,
  columnId: number,
  colName: string,
  name: string,
  description?: string,
  comments?: CommentType[],
}
