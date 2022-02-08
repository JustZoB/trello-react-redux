import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { AddCardButton } from './AddCardButton';
import { TextareaHead } from '../Textarea';
import { CardType } from '../../interfaces';

export const Column: React.FC<Props> = ({
  columnId,
  name,
  cards,
  userName,
  addCard,
  deleteCard,
  changeDescriptionCard,
  addComment,
  editComment,
  deleteComment
}) => {
  const [columnName, setColumnName] = useState<string>(name);
  const columnNameRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyPressBlurColumnName = (e: React.KeyboardEvent<HTMLTextAreaElement | null>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      columnNameRef.current?.blur()
    }
  }

  return (
    <StyledColumn>
      <TextareaHead
        value={columnName}
        onChange={e => setColumnName(e.target.value)}
        onKeyPress={handleKeyPressBlurColumnName}
        textareaRef={columnNameRef}
      >
        {name}
      </TextareaHead>

      {cards &&
        <CardList>
          {cards.map(({id, name, description, comments}) => (
            <Card
              key={id}
              id={id}
              columnId={columnId}
              name={name}
              description={description}
              comments={comments}
              colName={columnName}
              userName={userName}
              deleteCard={deleteCard}
              changeDescriptionCard={changeDescriptionCard}
              addComment={addComment}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          ))}
        </CardList>
      }

      <AddCardButton columnId={columnId} addCard={addCard} />
    </StyledColumn>
  );
}

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  min-width: 300px;
  height: fit-content;
  background-color: lightgray;
  border-radius: 7px;
  max-height: calc(100% - 15px);

  &:not(:last-child) {
    margin-right: 10px;
  }

  & > * {
    padding: 0 5px;
  }
`

const CardList = styled.div`
  overflow-y: auto;
  margin-bottom: 10px;
  padding-bottom: 2px;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  &::-webkit-scrollbar {
    padding-right: 10px;
    padding: 2px;
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }
`

interface Props {
  columnId: number,
  name: string,
  cards?: CardType[],
  userName: string,
  addCard: (columnId: number, cardName: string) => void,
  deleteCard: (columnId: number, cardId: number) => void,
  changeDescriptionCard: (columnId: number, cardId: number, descriptionCard: string) => void,
  addComment: (columnId: number, cardId: number, commentText: string) => void,
  editComment: (columnId: number, cardId: number, commentId: number, newCommentText: string) => void,
  deleteComment: (columnId: number, cardId: number, commentId: number) => void,
}
