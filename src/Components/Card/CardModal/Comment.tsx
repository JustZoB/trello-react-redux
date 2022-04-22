import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store/store';
import { getCommentAuthor, getCommentContent, getUserNameSuperSelector } from '../../../store/selectors';
import { deleteComment, editComment } from '../../../store/column/columnSlice';
import { Button, ButtonsWrapper } from '../../Button';
import { CloseButton } from '../../CloseButton';
import { Textarea } from '../../Textarea';

export const Comment: React.FC<Props> = ({
  columnId,
  cardId,
  commentId,
}) => {
  const dispatch = useDispatch();
  const userName = useSelector( (state: RootState) => getUserNameSuperSelector(state))
  const commentAuthor = useSelector( (state: RootState) => getCommentAuthor(state, columnId, cardId, commentId))
  const commentContent = useSelector( (state: RootState) => getCommentContent(state, columnId, cardId, commentId))
  const [commentEditMode, setCommentEditMode] = useState<boolean>(false)

  const [editedCommentContent, setEditedCommentContent] = useState<{
    newCommentContent: string,
    prevCommentContent: string,
  }>(
    {
      newCommentContent: commentContent !== undefined ? commentContent : '',
      prevCommentContent: commentContent !== undefined ? commentContent : '',
    }
  );

  const handleClickEditComment = () => {
    setEditedCommentContent({ ...editedCommentContent, prevCommentContent: editedCommentContent.newCommentContent})
    setCommentEditMode(true)
  }

  const handleClickSaveEditingComment = () => {
    dispatch(editComment({columnId, cardId, commentId, newCommentContent: editedCommentContent.newCommentContent}))
    setEditedCommentContent({ ...editedCommentContent, newCommentContent: editedCommentContent.newCommentContent})
    setCommentEditMode(false)
  }

  const handleKeywordSaveEditingComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSaveEditingComment()
    }
  }

  const handleClickDontSaveDescription = () => {
    setEditedCommentContent({ ...editedCommentContent, newCommentContent: editedCommentContent.prevCommentContent})
    setCommentEditMode(false)
  }

  const handleClickDeleteComment = () => {
    dispatch(deleteComment({columnId, cardId, commentId}))
  }

  return (
    <CommentContent>
      <User>{commentAuthor}</User>
      {!commentEditMode &&
        <CommentText>{commentContent}</CommentText>
      }
      {userName === commentAuthor && !commentEditMode &&
        <ButtonsWrapper>
          <Button size='small' label='Edit' onClick={handleClickEditComment} />
          <Button size='small' label='Delete' onClick={handleClickDeleteComment} />
        </ButtonsWrapper>
      }
      {commentEditMode &&
      <>
          <Textarea
            placeholder='Write comment...'
            value={editedCommentContent.newCommentContent}
            onChange={e => setEditedCommentContent({ ...editedCommentContent, newCommentContent: e.target.value})}
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
}
