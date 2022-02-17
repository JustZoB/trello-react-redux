import { createSelector } from "reselect"
import { CardType, ColumnType, CommentType } from "../interfaces"

export const getDataList = (state: { column: { dataList: ColumnType[] } }) => state.column.dataList

export const getUserName = (state: { user: { userName: string }}) => state.user.userName

export const getColumnName = (
  state: { column: { dataList: ColumnType[] } },
  columnId: number
) : string => {
  return state.column.dataList.filter(column => {
    if (column.columnId === columnId) {
      return column.name
    }

    return undefined
  })[0].name
}

export const getColumnCards = (
  state: { column: { dataList: ColumnType[] } },
  columnId: number
) : CardType[] | undefined => {
  return state.column.dataList.filter(column => {
    if (column.columnId === columnId) {
      return column
    }

    return undefined
  })[0].cards
}

export const getCardName = (
  state: { column: { dataList: ColumnType[] } },
  columnId: number,
  cardId: number
) : string => {
  let cardName = ''

  state.column.dataList.filter(column => {
    if (column.columnId === columnId && column.cards !== undefined) {
      cardName = column.cards.filter(card => card.id === cardId)[0].name
    }

    return column
  })

  return cardName
}

export const getCardDescription = (
  state: { column: { dataList: ColumnType[] } },
  columnId: number,
  cardId: number
) : string | undefined => {
  let cardDescription: string | undefined = undefined

  state.column.dataList.filter(column => {
    if (column.columnId === columnId && column.cards !== undefined) {
      cardDescription = column.cards.filter(card => card.id === cardId)[0].description
    }

    return column
  })

  return cardDescription
}

export const getCardComments = (
  state: { column: { dataList: ColumnType[] } },
  columnId: number,
  cardId: number
) : CommentType[] | undefined => {
  let cardCommments: CommentType[] | undefined = undefined

  state.column.dataList.filter(column => {
    if (column.columnId === columnId && column.cards !== undefined) {
      cardCommments = column.cards.filter(card => card.id === cardId)[0].comments
    }

    return column
  })

  return cardCommments
}

export const getCommentAuthor = (
  state: { column: { dataList: ColumnType[] } },
  columnId: number,
  cardId: number,
  commentId: number,
) : string => {
  let commentAuthor: string = ''

  state.column.dataList.filter(column => {
    if (column.columnId === columnId && column.cards !== undefined) {
      column.cards.filter(card => {
        if (card.id === cardId && card.comments !== undefined) {
          commentAuthor = card.comments.filter(comment => comment.id === commentId)[0].author
        }

        return card
      })
    }

    return column
  })

  return commentAuthor
}

export const getCommentContent = (
  state: { column: { dataList: ColumnType[] } },
  columnId: number,
  cardId: number,
  commentId: number,
) : string => {
  let commentContent: string = ''

  state.column.dataList.filter(column => {
    if (column.columnId === columnId && column.cards !== undefined) {
      column.cards.filter(card => {
        if (card.id === cardId && card.comments !== undefined) {
          commentContent = card.comments.filter(comment => comment.id === commentId)[0].content
        }

        return card
      })
    }

    return column
  })

  return commentContent
}

export const getDataListSuperSelector = createSelector(getDataList, (dataList) => {
  return dataList
})

export const getUserNameSuperSelector = createSelector(getUserName, (userName) => {
  return userName
})
