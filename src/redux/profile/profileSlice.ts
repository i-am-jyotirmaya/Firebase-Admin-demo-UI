import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        displayName: '',
        email: '',
    },
    reducers: {
        loadProfile: (state, action) => {

        },
        updateProfile: (state, action) => {

        }
    }
});

export default profileSlice.reducer;

export const selectProfileDisplayName = (state: RootState) => state.profile.displayName;
export const selectProfileEmail = (state: RootState) => state.profile.email;