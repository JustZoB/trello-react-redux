import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType, ColumnType, CommentType } from '../../interfaces';

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    dataList: [
      {
        "columnId": 1,
        "name": "ToDo",
        "cards": [
          { "id": 1, "name": "Vacuum" },
          { "id": 2, "name": "Bath" },
          { "id": 3, "name": "Shop" },
          { "id": 4, "name": "Shop" },
          { "id": 5, "name": "Shop" },
          { "id": 6, "name": "Shop" },
          { "id": 7, "name": "Shop" },
          { "id": 8, "name": "Shop" },
          { "id": 9, "name": "Shop" },
          { "id": 10, "name": "Shop" },
          { "id": 11, "name": "Shop" },
          { "id": 12, "name": "Shop" },
          { "id": 13, "name": "Shop" },
          { "id": 14, "name": "Shop" },
          { "id": 15, "name": "Shop" },
          { "id": 16, "name": "Shop" }
        ]
      },
      {
        "columnId": 2,
        "name": "Progress",
        "cards": [
          { "id": 1,  "name": "Work", "description": "Hello, im work" }
        ]
      },
      {
        "columnId": 3,
        "name": "Testing",
        "cards": [
          {
            "id": 1,
            "name": "Testing",
            "comments": [
              {
                "id": 1,
                "author": "Testing Guy",
                "content": "This is bullshit"
              }
            ]
          }
        ]
      },
      {
        "columnId": 4,
        "name": "Done"
      }
    ],
  },
  reducers: {
    editColumnName(state, action: PayloadAction<{
      columnId: number,
      newColumnName: string
    }>) {
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId) {
          return { ...column, name: action.payload.newColumnName }
        }
  
        return column
      })
    },
    addCard(state, action: PayloadAction<{
      columnId: number,
      cardName: string,
    }>) {
      const newCard = {
        id: Number(Date.now()),
        name: action.payload.cardName
      }
      
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId) {
          return column.cards === undefined ? { ...column, cards: [newCard] } : { ...column, cards: [...column.cards, newCard] }
        }
  
        return column
      })
    },
    deleteCard(state, action: PayloadAction<{
      columnId: number,
      cardId: number,
    }>) {
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId && column.cards !== undefined) {
          let cardList: CardType[] = column.cards?.filter((item : CardType) => item.id !== action.payload.cardId)
  
          return { ...column, cards: cardList }
        }
  
        return column
      })
    },
    editCardName (state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      newName: string,
    }>) {
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId && column.cards !== undefined) {
          column.cards?.map((item: CardType) => {
            if (item.id === action.payload.cardId) {
              item.name = action.payload.newName

              console.log(action.payload.newName)
            }
  
            return item
          })
        }
  
        return column
      })
    },
    editCardDescription(state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      description: string,
    }>) {
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId) {
          column.cards?.map((item: CardType) => {
            if (item.id === action.payload.cardId) {
              item.description = action.payload.description
            }
  
            return item
          })
        }
  
        return column
      })
    },
    addComment (state, action: PayloadAction<{
      userName: string,
      columnId: number,
      cardId: number,
      commentText: string,
    }>) {
      const newComment = {
        id: Number(Date.now()),
        author: action.payload.userName,
        content: action.payload.commentText,
      }
  
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId) {
          column.cards?.map((item: CardType) => {
            if (item.id === action.payload.cardId) {
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
    },
    deleteComment (state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      commentId: number,
    }>) {
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId && column.cards !== undefined) {
          let cardMap: CardType[] = column.cards?.map((card: CardType) => {
            if (card.id === action.payload.cardId && card.comments !== undefined) {
              let commentList: CommentType[] = card.comments?.filter((comment : CommentType) => comment.id !== action.payload.commentId)
  
              return { ...card, comments: commentList }
            }
  
            return card
          })
  
          return { ...column, cards: cardMap }
        }
  
        return column
      })
    },
    editComment (state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      commentId: number,
      newCommentContent: string,
    }>) {
      state.dataList = state.dataList.map((column: ColumnType) => {
        if (column.columnId === action.payload.columnId) {
          column.cards?.map((card: CardType) => {
            if (card.id === action.payload.cardId) {
              card.comments?.map((comment: CommentType) => {
                if (comment.id === action.payload.commentId) {
                  comment.content = action.payload.newCommentContent
                }
  
                return comment
              })
            }
  
            return card
          })
        }
  
        return column
      })
    },
  },
});

export const {
  editColumnName,
  addCard,
  deleteCard,
  editCardDescription,
  editCardName,
  addComment,
  deleteComment,
  editComment,
} = columnSlice.actions;

export default columnSlice.reducer;
