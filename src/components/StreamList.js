import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import searchIcon from "../icons/search.png";
import playIcon from "../icons/play.png";
import deleteIcon from "../icons/delete.png";
import editIcon from "../icons/edit.png";
import favoriteIcon from "../icons/favorite.png";
import "./StreamList.css"; // Import the separate CSS file

const StreamList = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // 🔹 Load data from Local Storage when the component mounts
  useEffect(() => {
    const savedList = localStorage.getItem("streamlist");
    if (savedList) {
      setList(JSON.parse(savedList));
    }
  }, []);

  // 🔹 Save data to Local Storage whenever the list updates
  useEffect(() => {
    localStorage.setItem("streamlist", JSON.stringify(list));
  }, [list]);

  // 🔹 Add a new item to the list with UUID
  const addToList = () => {
    if (input.trim()) {
      const newList = [...list, { id: uuidv4(), text: input, completed: false }];
      setList(newList);
      setInput(""); // Clear input field
    }
  };

  // 🔹 Toggle item completion
  const toggleComplete = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  // 🔹 Start editing a list item
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // 🔹 Save the edited item
  const saveEdit = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, text: editingText } : item
    );
    setList(updatedList);
    setEditingId(null);
    setEditingText("");
  };

  // 🔹 Delete an item
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="streamlist-container">
      <h1>StreamList</h1>
      <div>
        <input
          type="text"
          placeholder="Enter movie or show"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="streamlist-input"
        />
        <button onClick={addToList} className="streamlist-button">
          <img src={searchIcon} alt="Search" width="20" height="20" />
        </button>
      </div>
      <ul>
        {list.map((item) => (
          <li key={item.id} className="streamlist-item">
            {editingId === item.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEdit(item.id)}
                autoFocus
                className="edit-input"
              />
            ) : (
              <span className={item.completed ? "completed" : ""} style={{ flexGrow: 1 }}>
                {item.text}
              </span>
            )}
            <button aria-label="Play">
              <img src={playIcon} alt="Play" width="20" height="20" />
            </button>
            <button onClick={() => toggleComplete(item.id)} aria-label="Complete">
              <img src={favoriteIcon} alt="Complete" width="20" height="20" />
            </button>
            <button onClick={() => startEditing(item.id, item.text)} aria-label="Edit">
              <img src={editIcon} alt="Edit" width="20" height="20" />
            </button>
            <button onClick={() => deleteItem(item.id)} aria-label="Delete">
              <img src={deleteIcon} alt="Delete" width="20" height="20" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;

