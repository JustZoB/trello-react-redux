import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonsWrapper } from '../../Button';
import { CloseButton } from '../../CloseButton';
import { Textarea } from '../../Textarea';

export const Comment: React.FC<Props> = ({columnId, cardId, commentId, commentText, commentAuthor, userName, editComment, deleteComment}) => {
  const [editingCommentActive, setEditingCommentActive] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>(commentText !== undefined ? commentText : '');
  const [oldCommentText, setOldCommentText] = useState<string>(commentText !== undefined ? commentText : '');

  const handleClickEditComment = () => {
    setOldCommentText(newCommentText)
    setEditingCommentActive(true)
  }

  const handleClickSaveEditingComment = () => {
    editComment(columnId, cardId, commentId, newCommentText)
    setNewCommentText(newCommentText)
    setEditingCommentActive(false)
  }

  const handleKeywordSaveEditingComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editComment(columnId, cardId, commentId, newCommentText)
      setNewCommentText(newCommentText)
      setEditingCommentActive(false)
    }
  }

  const handleClickDontSaveDescription = () => {
    setNewCommentText(oldCommentText)
    setEditingCommentActive(false)
  }

  const handleClickDeleteComment = () => {
    deleteComment(columnId, cardId, commentId)
  }

  return (
    <CommentContent>
      <User>{commentAuthor}</User>
      {!editingCommentActive &&
        <CommentText>{commentText}</CommentText>
      }
      {userName === commentAuthor && !editingCommentActive &&
        <ButtonsWrapper>
          <Button size='small' label='Edit' onClick={handleClickEditComment} />
          <Button size='small' label='Delete' onClick={handleClickDeleteComment} />
        </ButtonsWrapper>
      }
      {editingCommentActive &&
      <>
          <Textarea
            placeholder='Write comment...'
            value={newCommentText}
            onChange={e => setNewCommentText(e.target.value)}
            onKeyPress={handleKeywordSaveEditingComment}
            autoFocus={true}
            onFocus={e => e.currentTarget.select()}
          />
          <ButtonsWrapper>
            <Button label='Save' onClick={handleClickSaveEditingComment} />
            <CloseButton onClick={handleClickDontSaveDescription} />
          </ButtonsWrapper>
        </>
      }
    </CommentContent>
  );
}

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`

const User = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
`

const CommentText = styled.div`
  display: flex;
  margin-bottom: 5px;
`

interface Props {
  columnId: number,
  cardId: number,
  commentId: number,
  commentText: string,
  commentAuthor: string,
  userName: string,
  editComment: (columnId: number, cardId: number, commentId: number, newCommentText: string) => void,
  deleteComment: (columnId: number, cardId: number, commentId: number) => void,
}
