import { createSlice } from "@reduxjs/toolkit";

const actionClickSlice = createSlice({
  name: "actionClick",
  initialState: {
    isOpen: true,
  },
  reducers: {
    setIsOpen: (state) => {
        state.isOpen = !state.isOpen;
    }
  },
});

export const {
    setIsOpen,

} = actionClickSlice.actions;

export default actionClickSlice.reducer;
