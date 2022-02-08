import { useState } from 'react';
import { CommentType } from '../../interfaces';
import { StyledCard } from '../StyledCard';
import { CardModal } from './CardModal';

export const Card: React.FC<CardProps> = ({
  id,
  columnId,
  colName,
  name,
  description,
  comments,
  userName,
  deleteCard,
  changeDescriptionCard,
  addComment,
  editComment,
  deleteComment
}) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>(name);

  const handleChange = (name: string) => {
    setCardName(name)
  }

  return (
    <div>
      <StyledCard onClick={() => setModalActive(true)}>
        <p>{cardName}</p>
      </StyledCard>
      {modalActive &&
        <CardModal
          active={modalActive}
          setActive={setModalActive}
          cardId={id}
          columnId={columnId}
          colName={colName}
          name={cardName}
          userName={userName}
          onChangeCardName={handleChange}
          description={description}
          comments={comments}
          deleteCard={deleteCard}
          changeDescriptionCard={changeDescriptionCard}
          addComment={addComment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      }
    </div>
  );
}

interface CardProps {
  colName: string,
  id: number,
  columnId: number,
  name: string,
  description?: string,
  comments?: CommentType[],
  userName: string,
  deleteCard: (columnId: number, cardId: number) => void,
  changeDescriptionCard: (columnId: number, cardId: number, descriptionCard: string) => void,
  addComment: (columnId: number, cardId: number, commentText: string) => void,
  editComment: (columnId: number, cardId: number, commentId: number, newCommentText: string) => void,
  deleteComment: (columnId: number, cardId: number, commentId: number) => void,
}
