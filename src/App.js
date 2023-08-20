import ToDo from "./components/ToDo.js";
import { useDispatch, useSelector } from "react-redux"; // Redux Hooks
import { addToDo, getAllToDos } from "./api/index.js"; // Actions to dispatch
import { useEffect, useState } from 'react';

function App() {

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.data) // This re-randers when state change
  // state.todos = { data: [] , status: , error: }

  // READ Operation
  // This will occur first time and when any other actions is dispatched
  // To make sure we read up to date data
  useEffect(() => { 
    dispatch(getAllToDos());
  }, [dispatch]); 

  // CREATE Operation
  const [newToDoText, setNewToDoText] = useState('');
  const addToDoHandle = async () => {
    const newToDo = {
      text: newToDoText // new To Do entered by user
    }; 
    await dispatch(addToDo(newToDo));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To Do App</h1>
        <div className="top">
          <input 
            type="text" 
            placeholder="Add ToDos...." 
            value={newToDoText}
            onChange={e => setNewToDoText(e.target.value)}
          />
          <div className="add" onClick={addToDoHandle} >Add</div>
        </div>
        <div className="list">
          {/* todos is an array of texts*/}
          {todos.map((todo) => <ToDo key={todo._id} id={todo._id} text={todo.text}/>)}
          {/* A unique key must be provided to each component. Key is not a prop so can't be accessed like a prop*/}
        </div>
      </div>
    </div>
  );
}

export default App;
