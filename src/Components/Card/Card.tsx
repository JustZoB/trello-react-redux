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
}) => {
  const [modalActive, setModalActive] = useState<boolean>(false);

  return (
    <div>
      <StyledCard onClick={() => setModalActive(true)}>
        <p>{name}</p>
      </StyledCard>
      {modalActive &&
        <CardModal
          active={modalActive}
          setActive={setModalActive}
          cardId={id}
          columnId={columnId}
          colName={colName}
          name={name}
          description={description}
          comments={comments}
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
}
