

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types";

import { getDecryptedStorage, setEncryptedStorage, removeStorage } from '../../utils/encryption';
 

interface AuthState {
    user: User | null;
    isAuthenticated : boolean;
    loading : boolean;
}

const initialState : AuthState = {
    user: null,
    isAuthenticated : false,
    loading : false,
}

const existingUser = getDecryptedStorage('user');
if(existingUser){
    try {
        initialState.user = JSON.parse(existingUser);
        initialState.isAuthenticated = true;
    } catch (error) {
        removeStorage('user')
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{

        loginStart: (state) => {
            state.loading = true;
        },

        loginSuccess : (state, action: PayloadAction<{user: User; accessToken: string; refreshToken: string}>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;

            setEncryptedStorage('user', JSON.stringify(action.payload.user));
            setEncryptedStorage('accessToken', action.payload.accessToken);
            setEncryptedStorage('refreshToken', action.payload.refreshToken);
        },

        logout: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;

            removeStorage('user');
            removeStorage('accessToken');
            removeStorage('refreshToken');
        }

    }
})

export const { loginStart, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;