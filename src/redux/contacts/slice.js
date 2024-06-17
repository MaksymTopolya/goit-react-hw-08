import { createSelector, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const slice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      loading: false,
      error: false,
    },
    filters: {
      name: "",
    },
  },
  reducers: {
    changeFilter: (state, action) => {
      state.filters.name = action.payload 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.contacts.loading = false;
        state.contacts.error = true;
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state) => {
        state.contacts.loading = false;
        state.contacts.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.loading  = false;
        state.contacts.error = false;
        state.contacts.items = state.contacts.items.filter(item => item.id !== action.payload.id) 
      })
      .addCase(deleteContact.rejected, (state) => {
        state.contacts.loading = false;
        state.contacts.error = true;
      });
  },
});

export default slice.reducer;

export const { changeFilter } = slice.actions;




