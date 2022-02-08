import { useState } from 'react';
import styled from 'styled-components';
import { CardType, ColumnType, CommentType } from '../../interfaces';
import { Column } from '../Column';
import { GreetingsModal } from '../GreetingsModal';
import data from './../../data.json'

export const Board: React.FC = () => {
  const [dataList, setDataList] = useState<ColumnType[]>(data);
  const [userName, setUserName] = useState<string>('');

  const addCard = (
    columnId: number,
    cardName: string
  ) => {
    const newCard = {
      id: Number(Date.now()),
      name: cardName
    }

    const newDataList: ColumnType[] = dataList.map((column: ColumnType) => {
      if (column.columnId === columnId) {
        return column.cards === undefined ? { ...column, cards: [newCard] } : { ...column, cards: [...column.cards, newCard] }
      }

      return column
    })

    setDataList(newDataList)
  }

  const deleteCard = (
    columnId: number,
    cardId: number
  ) => {
    const newDataList: ColumnType[] = dataList.map((column: ColumnType) => {
      if (column.columnId === columnId && column.cards !== undefined) {
        let cardList: CardType[] = column.cards?.filter((item : CardType) => item.id !== cardId)

        return { ...column, cards: cardList }
      }

      return column
    })

    setDataList(newDataList)
  }

  const changeCardDescription = (
    columnId: number,
    cardId: number,
    description: string
  ) => {
    const newDataList: ColumnType[] = dataList.map((column: ColumnType) => {
      if (column.columnId === columnId) {
        column.cards?.map((item: CardType) => {
          if (item.id === cardId) {
            item.description = description
          }

          return item
        })
      }

      return column
    })

    setDataList(newDataList)
  }

  const addComment = (
    columnId: number,
    cardId: number,
    commentText: string
  ) => {
    const newComment = {
      id: Number(Date.now()),
      author: userName,
      content: commentText,
    }

    const newDataList: ColumnType[] = dataList.map((column: ColumnType) => {
      if (column.columnId === columnId) {
        column.cards?.map((item: CardType) => {
          if (item.id === cardId) {
            if (item.comments === undefined) {
              item.comments = [newComment]
            } else {
              item.comments = [...item.comments, newComment]
            }
          }

          return item
        })
      }

      return column
    })

    setDataList(newDataList)
  }

  const editComment = (
    columnId: number,
    cardId: number,
    commentId: number,
    newCommentContent: string
  ) => {
    const newDataList: ColumnType[] = dataList.map((column: ColumnType) => {
      if (column.columnId === columnId) {
        column.cards?.map((card: CardType) => {
          if (card.id === cardId) {
            card.comments?.map((comment: CommentType) => {
              if (comment.id === commentId) {
                comment.content = newCommentContent
              }

              return comment
            })
          }

          return card
        })
      }

      return column
    })

    setDataList(newDataList)
  }

  const deleteComment = (
    columnId: number,
    cardId: number,
    commentId: number
  ) => {
    const newDataList: ColumnType[] = dataList.map((column: ColumnType) => {
      if (column.columnId === columnId && column.cards !== undefined) {
        let cardMap: CardType[] = column.cards?.map((card: CardType) => {
          if (card.id === cardId && card.comments !== undefined) {
            let commentList: CommentType[] = card.comments?.filter((comment : CommentType) => comment.id !== commentId)

            return { ...card, comments: commentList }
          }

          return card
        })

        return { ...column, cards: cardMap }
      }

      return column
    })

    setDataList(newDataList)
  }

  const handleSubmitSetUserName = (name: string) => {
    setUserName(name)
  }

  return (
    <StyledBoard>
      <ColumnListWrapper>
        {dataList.map(({columnId, name, cards}) => (
          <Column
            key={columnId}
            columnId={columnId}
            name={name}
            cards={cards}
            userName={userName}
            addCard={addCard}
            deleteCard={deleteCard}
            changeDescriptionCard={changeCardDescription}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        ))}
      </ColumnListWrapper>
      <GreetingsModal onSubmit={handleSubmitSetUserName} />
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
