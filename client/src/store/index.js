import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  data: {},
  token: null,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getData: (state) => {
      return state
    },
    getToken: (state) => {
      return state.token
    },
    setData: (state, action) => {
      if (action.payload.user) state.user = action.payload.user;
      if (action.payload.data) state.data = action.payload.data;
      if (action.payload.token) state.token = action.payload.token;
    }
  },
});

export const { getData, getToken, setData } = dataSlice.actions

export default dataSlice.reducer