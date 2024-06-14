import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6661fdfc63e6a0189fec5cef.mockapi.io"

export const fetchContacts = createAsyncThunk(
    "contacts/getAll", 
    async (_, thunkApi) => {
        try {
            const responce = await axios.get("/contacts")
            return responce.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const addContact = createAsyncThunk(
    "contacts/add", 
    async (newContact, thunkApi) => {
        try {
            const responce = await axios.post("/contacts", newContact)
            return responce.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)


export const deleteContact = createAsyncThunk(
    "contacts/delete", 
    async (id, thunkApi) => {
        try {
            const responce = await axios.delete(`/contacts/${id}`)
            return responce.data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)
