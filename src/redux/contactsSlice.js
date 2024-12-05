import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
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
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          item => item.id !== action.payload.id
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          deleteContact.pending,
          addContact.pending
        ),
        state => {
          state.contacts.error = false;
          state.contacts.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          deleteContact.rejected,
          addContact.rejected
        ),
        state => {
          state.contacts.loading = false;
          state.contacts.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          deleteContact.fulfilled,
          addContact.fulfilled
        ),
        state => {
          state.contacts.loading = false;
        }
      );
  },
});

// Selectrors
export const selectIsLoading = state => state.contacts.contacts.loading;
export const selectIsError = state => state.contacts.contacts.error;
export const selectContacts = state => state.contacts.contacts.items;
export const selectNameFilter = state => state.filters.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const contactsReducer = slice.reducer;
