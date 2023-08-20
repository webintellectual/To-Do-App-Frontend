import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './slices_for_features/toDoSlice.js';

const store = configureStore({
    reducer: {
        // This name of reducer will be used to specify todos slice in state.
        // state.todos to access object corresponding to todos slice
        todos: todosReducer, 
    },
});

export default store;