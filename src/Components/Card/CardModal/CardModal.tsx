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
import { useDispatch } from 'react-redux';
import { cardDelete, cardDescriptionEdit, cardNameEdit, commentAdd } from '../../../features/board/boardSlice';

export const CardModal: React.FC<CardModalProps> = ({
    active,
    setActive,
    cardId,
    columnId,
    colName,
    name,
    description,
    comments,
  }) => {
  const dispatch = useDispatch();
  const [descriptionActive, setDescriptionActive] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>(description !== undefined ? description : '');
  const [oldDescription, setOldDescription] = useState<string>(description !== undefined ? description : '');
  const [commentText, setCommentText] = useState<string>('');
  const cardNameRef = useRef<HTMLTextAreaElement>(null)

  const handleClickCloseModal = () => {
    setNewDescription(oldDescription)
    setDescriptionActive(false)
    setActive(false)
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
    setOldDescription(newDescription)
    setDescriptionActive(true)
  }

  const handleClickSaveDescription = () => {
    dispatch(cardDescriptionEdit({columnId, cardId, description: newDescription}))
    setNewDescription(newDescription)
    setDescriptionActive(false)
  }

  const handleKeywordSaveDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSaveDescription()
    }
  }

  const handleClickDontSaveDescription = () => {
    setNewDescription(oldDescription)
    setDescriptionActive(false)
  }

  const handleClickDeleteCard = () => {
    dispatch(cardDelete({columnId, cardId}))
    setDescriptionActive(false)
  }

  const handleClickAddComment = () => {
    dispatch(commentAdd({columnId, cardId, commentText}))
    setCommentText('')
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
      onClick={() => setActive(false)}
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

        {newDescription && !descriptionActive &&
          <DescriptionContent
            description={newDescription}
            onClick={handleClickOpenAddingDescription}
          />
        }

        {!newDescription && !descriptionActive &&
          <AddDescriptionButton
            description={newDescription}
            onClick={handleClickOpenAddingDescription}
          />
        }

        {descriptionActive &&
          <AddDescriptionWrapper>
            <Textarea
              placeholder='Add description...'
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
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
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
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
