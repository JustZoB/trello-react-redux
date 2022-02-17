import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCardComments } from '../../../store/selectors';
import { RootState } from '../../../store/store';
import { Comment } from './Comment'

export const CommentsContent: React.FC<Props> = ({columnId, cardId}) => {
  const comments = useSelector( (state: RootState) => getCardComments(state, columnId, cardId))

  return (
    <>
    {comments &&
      <Content>
        {comments.map(({id, author}) => (
          <CommentWrapper key={id}>
            <Avatar title={author}>{author.charAt(0).toUpperCase()}</Avatar>
            <Comment
              columnId={columnId}
              cardId={cardId}
              commentId={id}
            />
          </CommentWrapper>
        ))}
      </Content>
    }
    </>
  );
}

const Content = styled.div`
  font-size: 14px;
  width: 100%;
  background-color: white;
  margin: 10px 0 0;
`

const CommentWrapper = styled.div`
  display: flex;
  padding: 10px 0;
`

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #DDDDDD;
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  cursor: default;
`

interface Props {
  columnId: number,
  cardId: number,
}
