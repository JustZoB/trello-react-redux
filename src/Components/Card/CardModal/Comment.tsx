import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../app/store';
import { commentDelete, commentEdit } from '../../../features/board/boardSlice';
import { Button, ButtonsWrapper } from '../../Button';
import { CloseButton } from '../../CloseButton';
import { Textarea } from '../../Textarea';

export const Comment: React.FC<Props> = ({columnId, cardId, commentId, commentContent, commentAuthor}) => {
  const dispatch = useDispatch();
  const userName = useSelector( (state: RootState) => state.user.userName)

  const [state, setState] = useState<{
    commentEditMode: boolean,
    newCommentContent: string,
    prevCommentContent: string,
  }>(
    {
      commentEditMode: false,
      newCommentContent: commentContent !== undefined ? commentContent : '',
      prevCommentContent: commentContent !== undefined ? commentContent : '',
    }
  );

  const handleClickEditComment = () => {
    setState({ ...state, prevCommentContent: state.newCommentContent})
    setState({ ...state, commentEditMode: true})
  }

  const handleClickSaveEditingComment = () => {
    dispatch(commentEdit({columnId, cardId, commentId, newCommentContent: state.newCommentContent}))
    setState({ ...state, newCommentContent: state.newCommentContent})
    setState({ ...state, commentEditMode: false})
  }

  const handleKeywordSaveEditingComment = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSaveEditingComment()
    }
  }

  const handleClickDontSaveDescription = () => {
    setState({ ...state, newCommentContent: state.prevCommentContent})
    setState({ ...state, commentEditMode: false})
  }

  const handleClickDeleteComment = () => {
    dispatch(commentDelete({columnId, cardId, commentId}))
  }

  return (
    <CommentContent>
      <User>{commentAuthor}</User>
      {!state.commentEditMode &&
        <CommentText>{commentContent}</CommentText>
      }
      {userName === commentAuthor && !state.commentEditMode &&
        <ButtonsWrapper>
          <Button size='small' label='Edit' onClick={handleClickEditComment} />
          <Button size='small' label='Delete' onClick={handleClickDeleteComment} />
        </ButtonsWrapper>
      }
      {state.commentEditMode &&
      <>
          <Textarea
            placeholder='Write comment...'
            value={state.newCommentContent}
            onChange={e => setState({ ...state, newCommentContent: e.target.value})}
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
  commentContent: string,
  commentAuthor: string,
}
