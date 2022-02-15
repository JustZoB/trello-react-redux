import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CardType, ColumnType } from '../../interfaces';
// import { without } from 'lodash';

const cardSlice = createSlice({
  name: 'card',
  initialState: {
  },
  reducers: {
    cardAdd(state, action: PayloadAction<{
      columnId: number,
      cardName: string,
    }>) {
      console.log(action.payload)
    },
    cardDelete(state, action: PayloadAction<{
      columnId: number,
      cardId: number,
    }>) {
      console.log(action.payload)
    },
    cardNameEdit(state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      newName: string,
    }>) {
      console.log(action.payload)
    },
    cardDescriptionEdit(state, action: PayloadAction<{
      columnId: number,
      cardId: number,
      description: string,
    }>) {
      console.log(action.payload)
    },
  },
});

export const { cardAdd, cardDelete, cardNameEdit, cardDescriptionEdit } = cardSlice.actions;

export default cardSlice.reducer;
