import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledCard } from '../../StyledCard';
import { Button, ButtonsWrapper } from '../../Button/Button';
import { CloseButton } from '../../CloseButton';
import { Textarea } from '../../Textarea';
import { useDispatch } from 'react-redux';
import { addCard } from '../../../store/column/columnSlice';

export const AddCardButton: React.FC<AddCardButtonProps> = ({columnId}) => {
  const dispatch = useDispatch();
  const [cardAddingActive, setCardAddingActive] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>('');

  const handleClickAddCard = () => {
    if (cardName !== '') {
      dispatch(addCard({columnId, cardName}))
      setCardName('')
    }
  }

  const handleClickCloseAdding = () => {
    setCardAddingActive(false)
    setCardName('')
  }

  return (
    <div>
      {!cardAddingActive &&
        <StyledCard
          variant='secondary'
          onClick={() => setCardAddingActive(true)}
        >
          + Add card
        </StyledCard>
      }

      {cardAddingActive &&
        <AddingCardWrapper>
          <Textarea
            placeholder='Name your card'
            value={cardName}
            onChange={e => setCardName(e.target.value)}
            autoFocus={true}
          />
          <ButtonsWrapper>
            <Button label='Add card' onClick={handleClickAddCard} />
            <CloseButton onClick={handleClickCloseAdding}></CloseButton>
          </ButtonsWrapper>
        </AddingCardWrapper>
      }
    </div>
  );
}

const AddingCardWrapper = styled.div`
  Textarea {
    margin: 0 0 10px;
    padding: 10px;
    background-color: white;
    width: calc(100% - 20px);
    height: 50px;
    outline: 0;
  }
`

interface AddCardButtonProps {
  columnId: number,
}
