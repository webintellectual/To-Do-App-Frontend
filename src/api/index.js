import axios from 'axios'; // Library to work with APIs
import { createAsyncThunk } from '@reduxjs/toolkit'; // Middleware

// const baseUrl = "http://localhost:5000";
const baseUrl = "https://to-do-app-backend-86th.onrender.com";


// Async requests:

// READ Request 
export const getAllToDos = createAsyncThunk(
	'read',  // action type string
	 async () => {const response = await axios.get(baseUrl);
                  console.log(response.data);
				  return response.data;
                 } // callback function
); 

// CREATE Request
export const addToDo = createAsyncThunk(
    'create',
    async (toDo) => {
        const response = await axios.post(`${baseUrl}/save`, toDo);
        return response.data;
    }
)

// UPDATE Request
export const editToDo = createAsyncThunk(
    'update',
    async ({id, editedText}) => {
        const response = await axios.put(`${baseUrl}/todos/${id}`, {text: editedText});
        return response.data;
    }
)

// DELETE Request 
export const deleteToDo = createAsyncThunk(
    'delete',
    async (id) => {
        await axios.delete(`${baseUrl}/todos/${id}`);
        return id;
    }
)
