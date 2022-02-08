import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledCard } from '../../StyledCard';
import { Button, ButtonsWrapper } from '../../Button/Button';
import { CloseButton } from '../../CloseButton';
import { Textarea } from '../../Textarea';

export const AddCardButton: React.FC<AddCardButtonProps> = ({columnId, addCard}) => {
  const [cardAddingActive, setCardAddingActive] = useState<boolean>(false);
  const [newCardName, setNewCardName] = useState<string>('');

  const handleClickAddCard = () => {
    if (newCardName !== '') {
      addCard(columnId, newCardName)
      setNewCardName('')
    }
  }

  const handleClickCloseAdding = () => {
    setCardAddingActive(false)
    setNewCardName('')
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
            value={newCardName}
            onChange={e => setNewCardName(e.target.value)}
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
  addCard: (columnId: number, name: string) => void,
}
