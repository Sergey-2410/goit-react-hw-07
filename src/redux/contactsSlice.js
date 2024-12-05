import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './contactsOps';

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.pending, (state, action) => {
        state.contacts.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== action.payload.id
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      });
  },
});

// export const { addContact, deleteContact } = slice.actions;

export const contactsReducer = slice.reducer;
