import { createSlice } from "@reduxjs/toolkit";
import AuthConstants from "../../constants/AuthConstants";
import Emitter from "../../services/eventEmitter";
import { loginWithFirebase, logoutWithFirebase, signupWithFirebase, checkAdminWithFirebase, refreshLoginWithFirebase } from "../../services/firebase";
import { AppDispatch, RootState } from "../store";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authState: AuthConstants.Unknown,
        displayName: '',
        isAdmin: false,
        error: ''
    },
    reducers: {
        login: (state, action) => {
            state.authState = AuthConstants.Authenticated;
            state.displayName = action.payload.displayName;
            state.isAdmin = action.payload.isAdmin
            state.error = "";
        },
        logout: (state) => {
            state.authState = AuthConstants.NotAuthenticated;
            state.displayName = '';
            state.isAdmin = false;
            state.error = "";
        },
        loginError: (state, action) => {
            state.authState = AuthConstants.NotAuthenticated;
            switch(action.payload) {
                case "auth/wrong-password":
                    state.error = "Invalid Password!";
                    break;
                case "auth/user-not-found":
                    state.error = "User not found!";
                    break;
            }
        },
        clearError: (state) => {
            state.error = ''
        }
    }
});

export default authSlice.reducer;

export const { login, logout, loginError, clearError } = authSlice.actions;

export const loginAsync = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(clearError());
        const userCredential = await loginWithFirebase(email, password);
        const isAdmin = userCredential.user ? await checkAdminWithFirebase(userCredential.user) : false;
        console.log(userCredential);
        if(userCredential) {
            Emitter.emit('AUTH_DONE');
            dispatch(login({displayName: userCredential.user?.displayName || userCredential.user?.email, isAdmin}));
        }
    } catch (error) {
        console.warn(error);
        dispatch(loginError(error.code+''));
    }
}

export const logoutAsync = () => async (dispatch: AppDispatch) => {
    await logoutWithFirebase();
    dispatch(logout());
}

export const signupAsync = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(clearError());
        const userCredential = await signupWithFirebase(email, password);
        const isAdmin = userCredential.user ? await checkAdminWithFirebase(userCredential.user) : false;
        console.log(userCredential);
        if(userCredential) {
            Emitter.emit('AUTH_DONE');
            dispatch(login({displayName: userCredential.user?.displayName || userCredential.user?.email, isAdmin}));
        }
    } catch (error) {
        console.error(error);
    }
}

export const refreshLogin = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(clearError());
        const result = await refreshLoginWithFirebase();
        if(result)
            dispatch(login(result));
        else
            dispatch(logout());
    } catch (error) {
        console.log(error);
    }
}

export const selectAuthState = (state: RootState) => state.auth.authState;
export const selectDisplayName = (state: RootState) => state.auth.displayName;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectError = (state: RootState) => state.auth.error;