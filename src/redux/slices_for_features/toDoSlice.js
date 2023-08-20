import { createSlice } from "@reduxjs/toolkit";
import { getAllToDos, addToDo, editToDo, deleteToDo } from "../../api";

const toDoSlice = createSlice({
    name: "toDos",
    initialState : {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllToDos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllToDos.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getAllToDos.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(addToDo.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })

            .addCase(editToDo.fulfilled, (state,action) => {
                const editedToDo = action.payload;
                const existingToDo = state.data.find(toDo => toDo._id === editedToDo._id);
                if(existingToDo){
                    Object.assign(existingToDo, editedToDo);
                }
            })

            .addCase(deleteToDo.fulfilled, (state,action) => {
                const deletedToDoId = action.payload;
                // to dos with id not equal to the id of post to be deleted are filtered
                state.data = state.data.filter(toDo => toDo._id !== deletedToDoId);
            })

    },
});

export default toDoSlice.reducer;