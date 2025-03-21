import React, { useState, useEffect, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import searchIcon from "../icons/search.png";
import playIcon from "../icons/play.png";
import deleteIcon from "../icons/delete.png";
import editIcon from "../icons/edit.png";
import favoriteIcon from "../icons/favorite.png";
import "./StreamList.css"; // Import the separate CSS file

// Optimized List Item Component
const ListItem = memo(({ 
  item, editingId, editingText, setEditingText, saveEdit, 
  toggleComplete, startEditing, deleteItem 
}) => (
  <li className="streamlist-item">
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
      <span className={item.completed ? "completed" : ""}>
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
));

const StreamList = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState(() => {
    try {
      const savedList = localStorage.getItem("streamList");
      return savedList ? JSON.parse(savedList) : [];
    } catch (error) {
      console.error("Failed to load list from localStorage", error);
      return [];
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Save list to localStorage whenever it updates
  useEffect(() => {
    try {
      localStorage.setItem("streamList", JSON.stringify(list));
    } catch (error) {
      console.error("Failed to save list to localStorage", error);
    }
  }, [list]);

  // Add a new item to the list with UUID
  const addToList = () => {
    if (input.trim()) {
      setList([...list, { id: uuidv4(), text: input, completed: false }]);
      setInput(""); // Clear input field
    } else {
      alert("Input cannot be empty"); // Added validation feedback
    }
  };

  // Toggle item completion
  const toggleComplete = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  // Start editing a list item
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save the edited item
  const saveEdit = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, text: editingText } : item
    );
    setList(updatedList);
    setEditingId(null);
    setEditingText("");
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
          <ListItem
            key={item.id}
            item={item}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            saveEdit={saveEdit}
            toggleComplete={toggleComplete}
            startEditing={startEditing}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
