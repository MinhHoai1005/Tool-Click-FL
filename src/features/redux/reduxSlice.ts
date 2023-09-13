import {
    createSlice,
} from '@reduxjs/toolkit';


const reduxSlice = createSlice({
    name: 'redux',
    initialState: {
        path: window.location.pathname,
    },
    reducers: {
        push: (state, action) => ({ path: action.payload }),
    },
})
// Action
export const reduxAction = reduxSlice.actions;

// Reducers
const reduxReducers = reduxSlice.reducer;
export default reduxReducers;