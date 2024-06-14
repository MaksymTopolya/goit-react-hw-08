import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global"


const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  
  const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = "";
  };



export const registration = createAsyncThunk("auth/registration", 
    async (newUser, thunkApi)=> {
        try{
            const responce = await axios.post("/users/signup", newUser)
            setAuthHeader(responce.data.token);
            return responce.data
        }catch(error){
            return thunkApi.rejectWithValue(error.message);
        }

})


export const logIn = createAsyncThunk("auth/registration", 
    async (user, thunkApi)=> {
        try{
            const responce = await axios.post("/users/login", user)
            setAuthHeader(responce.data.token);
            return responce.data
        }catch(error){
            return thunkApi.rejectWithValue(error.message);
        }

})

export const logOut = createAsyncThunk("auth/registration", 
    async (user, thunkApi)=> {
        try{
            const responce = await axios.post("/users/logout", user)
            clearAuthHeader();
            return responce.data
        }catch(error){
            return thunkApi.rejectWithValue(error.message);
        }

})

export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkApi) => {
      const reduxState = thunkApi.getState();
      setAuthHeader(reduxState.auth.token);
  
      const res = await axios.get("/users/current");
      return res.data;
    },
    {
      condition(_, thunkApi) {
        const reduxState = thunkApi.getState();
        return reduxState.auth.token !== null;
      },
    }
  );