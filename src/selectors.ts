// import { createSelector } from "reselect"
import { ColumnType } from "./interfaces"

export const getDataList = (state: { column: { dataList: ColumnType[] } }) => state.column.dataList

export const getUserName = (state: { user: { userName: string }}) => state.user.userName
