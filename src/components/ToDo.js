import React from "react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { editToDo, deleteToDo } from "../api";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaCheck, FaTimes } from 'react-icons/fa';

const ToDo = ({ id , text }) => {
  const [isEditing, setIsEditing] = useState(false); // Initially we are not in editing mode
  const [normalModeText, setNormalModeText] = useState(text);
  const [editingModeText, setEditingModeText] = useState(text);

  const handleInputChange = (e) => {
    setEditingModeText(e.target.value); // here we can only set the text corresponding to value
    // We can set normalModetext with this event
  };

  const dispatch = useDispatch();

  const handleEditText = async (id, editingModeText) => { 
     // editing mode text is accepted and requested to update in database
      await dispatch(editToDo({id: id, editedText: editingModeText}));
      // set normal mode text with editing mode text also
      setNormalModeText(editingModeText);
      // get back to normal mode
      setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Again place the orginal text in the editing mode text 
    // so that next time we edit original text only
    setEditingModeText(normalModeText);
    // go back to mormal mode
    setIsEditing(false);
  };

  const handleDeleteToDo = async (id) => {
    await dispatch(deleteToDo(id));
  };

  return (
    <div className="todo">
      {isEditing ? (
        <>
          {/* value and onChange can only work on same variable */}
          <input className="editInput" type="text" value={editingModeText} onChange={handleInputChange}/>
          <div className="icons">
          <FaCheck className="icon" onClick={() => handleEditText(id,editingModeText)} />
            <FaTimes className="icon" onClick={handleCancelEdit}/>
          </div>
        </>
      ) : (
        <>
          <div className="text">{normalModeText}</div> {/* This will turn to an input field*/}
          <div className="icons">
            <BiEdit className="icon" onClick={() => setIsEditing(prev => !prev)}/> {/* This will turn to submit icon*/}
            <AiFillDelete className="icon" onClick={() => handleDeleteToDo(id)} /> {/* This will turn to cancel icon*/}
          </div>
        </>
      )}
    </div>
  );
};

export default ToDo;
