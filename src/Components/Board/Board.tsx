import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../app/store';
import { Column } from '../Column';
import { GreetingsModal } from '../GreetingsModal';

export const Board: React.FC = () => {
  const dataList = useSelector( (state: RootState) => state.board.dataList)

  return (
    <StyledBoard>
      <ColumnListWrapper>
        {dataList.map(({columnId, name, cards}) => (
          <Column
            key={columnId}
            columnId={columnId}
            name={name}
            cards={cards}
          />
        ))}
      </ColumnListWrapper>
      <GreetingsModal />
    </StyledBoard>
  );
}

const StyledBoard = styled.div`
  padding: 10px;
  background-color: gray;
  min-width: calc(100vw - 20px);
  margin-top: 50px;
  margin-bottom: 50px;
  overflow-x: hidden;
`

const ColumnListWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  height: calc(100% - 20px);
  padding-bottom: 20px;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    padding: 2px;
    height: 15px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }
`
