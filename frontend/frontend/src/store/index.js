import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {
        login(state) {
            state.isLoggedIn = true
         }, 
        logout(state) {
            localStorage.removeItem("userId"); //once the user logs out, remove the id of the user from the local storage
            state.isLoggedIn = false
        },
    }
}); 

//calling action creators
export const authActions = authSlice.actions

export const store = configureStore ({
    reducer: authSlice.reducer
});  