import { useRef } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { AddCardButton } from './AddCardButton';
import { TextareaHead } from '../Textarea';
import { useDispatch, useSelector } from 'react-redux';
import { editColumnName } from '../../store/column/columnSlice';
import { getColumnCards, getColumnName } from '../../store/selectors';
import { RootState } from '../../store/store';

export const Column: React.FC<Props> = ({
  columnId,
}) => {
  const dispatch = useDispatch();
  const columnNameRef = useRef<HTMLTextAreaElement>(null)
  const columnName = useSelector( (state: RootState) => getColumnName(state, columnId))
  const cards = useSelector( (state: RootState) => getColumnCards(state, columnId))

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
          {cards.map(({id}) => (
            <Card
              key={id}
              cardId={id}
              columnId={columnId}
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
}
