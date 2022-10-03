import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './index'

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});