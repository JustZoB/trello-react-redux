export type ColumnType = {
  columnId: number,
  name: string,
  cards?: CardType[],
}

export type CardType = {
  id: number,
  name: string,
  description?: string,
  comments?: CommentType[],
}

export type CommentType = {
  id: number,
  author: string,
  content: string,
}
