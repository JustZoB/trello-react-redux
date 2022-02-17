import { useRef } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { AddCardButton } from './AddCardButton';
import { TextareaHead } from '../Textarea';
import { CardType } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { editColumnName } from '../../store/column/columnSlice';

export const Column: React.FC<Props> = ({
  columnId,
  name: columnName,
  cards,
}) => {
  const dispatch = useDispatch();
  const columnNameRef = useRef<HTMLTextAreaElement>(null)

  const handleOnChangeColumnName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editColumnName({columnId, newColumnName: e.target.value}))
  }

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
        onChange={handleOnChangeColumnName}
        onKeyPress={handleKeyPressBlurColumnName}
        textareaRef={columnNameRef}
      >
        {columnName}
      </TextareaHead>

      {cards && cards.length !== 0 &&
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
            />
          ))}
        </CardList>
      }

      <AddCardButton columnId={columnId} />
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
}
