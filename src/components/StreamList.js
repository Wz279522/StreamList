import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import searchIcon from "../icons/search.png";
import playIcon from "../icons/play.png";
import deleteIcon from "../icons/delete.png";
import editIcon from "../icons/edit.png";
import favoriteIcon from "../icons/favorite.png";
import "./StreamList.css"; // Import CSS file

const StreamList = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  // Add a new item to the list with UUID
  const addToList = () => {
    if (input.trim()) {
      setList([...list, { id: uuidv4(), text: input, completed: false }]);
      setInput(""); // Clear input field
    }
  };

  // Toggle item completion
  const toggleComplete = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  // Edit an item
  const editItem = (id) => {
    const newText = prompt("Edit the item:", list.find((item) => item.id === id).text);
    if (newText) {
      const updatedList = list.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      );
      setList(updatedList);
    }
  };

  // Delete an item
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
            <span style={{ textDecoration: item.completed ? "line-through" : "none", flexGrow: 1 }}>
              {item.text}
            </span>
            <button>
              <img src={playIcon} alt="Play" width="20" height="20" />
            </button>
            <button onClick={() => toggleComplete(item.id)}>
              <img src={favoriteIcon} alt="Complete" width="20" height="20" />
            </button>
            <button onClick={() => editItem(item.id)}>
              <img src={editIcon} alt="Edit" width="20" height="20" />
            </button>
            <button onClick={() => deleteItem(item.id)}>
              <img src={deleteIcon} alt="Delete" width="20" height="20" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
