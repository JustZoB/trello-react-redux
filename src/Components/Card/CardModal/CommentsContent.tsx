import React from 'react';
import styled from 'styled-components';
import { CommentType } from '../../../interfaces';
import { Comment } from './Comment'

export const CommentsContent: React.FC<Props> = ({columnId, cardId, comments}) => {
  return (
    <>
    {comments &&
      <Content>
        {comments.map(({id, author, content}) => (
          <CommentWrapper key={id}>
            <Avatar title={author}>{author.charAt(0).toUpperCase()}</Avatar>
            <Comment
              columnId={columnId}
              cardId={cardId}
              commentId={id}
              commentAuthor={author}
              commentContent={content}
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
  comments?: CommentType[],
}
