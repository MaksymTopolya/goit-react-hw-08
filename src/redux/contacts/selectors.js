import { createSelector } from "@reduxjs/toolkit";

export const selectFilter = state => state.contacts.filters.name;

export const selectContacts = state => state.contacts.contacts.items;

export const selectLoading = state => state.contacts.contacts.loading;

export const selectError = state => state.contacts.contacts.error;



export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, textFilter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(textFilter.toLowerCase()) ||
      contact.number.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);