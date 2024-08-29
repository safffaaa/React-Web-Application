import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : JSON.parse(localStorage.getItem('token')) || null,
    isLogged :  JSON.parse(localStorage.getItem('isLogged')) || false,
    role :  JSON.parse(localStorage.getItem('role')) || null,
    use:"safa",
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login : (state,action)=>{
            state.token = action.payload.token
            state.isLogged = true
            state.role = action.payload.role
            localStorage.setItem('token',JSON.stringify(state.token))
            localStorage.setItem('isLogged',JSON.stringify(state.isLogged))
            localStorage.setItem('role',JSON.stringify(state.role))
        },
        logout : (state,action)=>{
            state.token = null
            state.isLogged = false
            state.role = null
            localStorage.clear()
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer