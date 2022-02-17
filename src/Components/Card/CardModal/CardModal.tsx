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
import { RootState } from '../../../store/store';
import { deleteCard, editCardDescription, editCardName, addComment } from '../../../store/column/columnSlice';
import { getUserNameSuperSelector } from '../../../store/selectors';

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
  const userName = useSelector( (state: RootState) => getUserNameSuperSelector(state))
  const cardNameRef = useRef<HTMLTextAreaElement>(null)
  const [descriptionEditMode, setDescriptionEditMode] = useState<boolean>(false)
  const [commentContent, setCommentContent] = useState<string>('')

  const [editedDescription, setEditedDescription] = useState<{
    newDescription: string,
    prevDescription: string,
  }>(
    {
      newDescription: description !== undefined ? description : '',
      prevDescription: description !== undefined ? description : '',
    }
  );

  const handleClickCloseModal = () => {
    setEditedDescription({ ...editedDescription, prevDescription: editedDescription.newDescription})
    setDescriptionEditMode(false)
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
    setEditedDescription({ ...editedDescription, prevDescription: editedDescription.newDescription})
    setDescriptionEditMode(true)
  }

  const handleClickSaveDescription = () => {
    dispatch(editCardDescription({columnId, cardId, description: editedDescription.newDescription}))
    setEditedDescription({ ...editedDescription, newDescription: editedDescription.newDescription})
    setDescriptionEditMode(false)
  }

  const handleKeywordSaveDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSaveDescription()
    }
  }

  const handleClickDontSaveDescription = () => {
    setEditedDescription({ ...editedDescription, newDescription: editedDescription.prevDescription})
    setDescriptionEditMode(false)
  }

  const handleClickDeleteCard = () => {
    dispatch(deleteCard({columnId, cardId}))
    setDescriptionEditMode(false)
  }

  const handleClickAddComment = () => {
    dispatch(addComment({columnId, cardId, commentText: commentContent, userName}))
    setCommentContent('')
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
          onChange={e => dispatch(editCardName({columnId, cardId, newName: e.target.value}))}
          onKeyPress={handleKeyPressBlurCardName}
          textareaRef={cardNameRef}
        >
          {name}
        </TextareaHead>
        <p>in column {colName}</p>
      </Header>

      <Description>
        <h4>Description</h4>

        {editedDescription.newDescription && !descriptionEditMode &&
          <DescriptionContent
            description={editedDescription.newDescription}
            onClick={handleClickOpenAddingDescription}
          />
        }

        {!editedDescription.newDescription && !descriptionEditMode &&
          <AddDescriptionButton
            description={editedDescription.newDescription}
            onClick={handleClickOpenAddingDescription}
          />
        }

        {descriptionEditMode &&
          <AddDescriptionWrapper>
            <Textarea
              placeholder='Add description...'
              value={editedDescription.newDescription}
              onChange={e => setEditedDescription({ ...editedDescription, newDescription: e.target.value})}
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
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
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
