import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CardType, ColumnType, CommentType } from '../../interfaces';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
  },
  reducers: {
    commentAdd(state, action: PayloadAction<{
      userName: string,
      columnId: number,
      cardId: number,
      commentText: string,
    }>) {
      console.log(action.payload)
    },
    commentDelete(state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      commentId: number,
    }>) {
      console.log(action.payload)
    },
    commentEdit(state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      commentId: number,
      newCommentContent: string,
    }>) {
      console.log(action.payload)
    },
  }
});

export const { commentAdd, commentDelete, commentEdit } = commentSlice.actions;

export default commentSlice.reducer;
