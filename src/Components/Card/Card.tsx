import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCardName } from '../../store/selectors';
import { RootState } from '../../store/store';
import { StyledCard } from '../StyledCard';
import { CardModal } from './CardModal';

export const Card: React.FC<CardProps> = ({
  cardId,
  columnId,
}) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const name = useSelector( (state: RootState) => getCardName(state, columnId, cardId))

  return (
    <div>
      <StyledCard onClick={() => setModalActive(true)}>
        <p>{name}</p>
      </StyledCard>
      {modalActive &&
        <CardModal
          active={modalActive}
          setActive={setModalActive}
          cardId={cardId}
          columnId={columnId}
        />
      }
    </div>
  );
}

interface CardProps {
  cardId: number,
  columnId: number,
}
