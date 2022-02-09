import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../app/store';
import { commentDelete, commentEdit } from '../../../features/board/boardSlice';
import { Button, ButtonsWrapper } from '../../Button';
import { CloseButton } from '../../CloseButton';
import { Textarea } from '../../Textarea';

export const Comment: React.FC<Props> = ({columnId, cardId, commentId, commentText, commentAuthor}) => {
  const dispatch = useDispatch();
  const userName = useSelector( (state: RootState) => state.board.userName)
  const [editingCommentActive, setEditingCommentActive] = useState<boolean>(false);
  const [newCommentContent, setNewCommentContent] = useState<string>(commentText !== undefined ? commentText : '');
  const [oldCommentContent, setOldCommentContent] = useState<string>(commentText !== undefined ? commentText : '');

  const handleClickEditComment = () => {
    setOldCommentContent(newCommentContent)
    setEditingCommentActive(true)
  }

  const handleClickSaveEditingComment = () => {
    dispatch(commentEdit({columnId, cardId, commentId, newCommentContent}))
    setNewCommentContent(newCommentContent)
    setEditingCommentActive(false)
  }

  const handleKeywordSaveEditingComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSaveEditingComment()
    }
  }

  const handleClickDontSaveDescription = () => {
    setNewCommentContent(oldCommentContent)
    setEditingCommentActive(false)
  }

  const handleClickDeleteComment = () => {
    dispatch(commentDelete({columnId, cardId, commentId}))
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
            value={newCommentContent}
            onChange={e => setNewCommentContent(e.target.value)}
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
}
