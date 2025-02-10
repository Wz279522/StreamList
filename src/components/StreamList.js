import React, { useState } from "react";
import searchIcon from "../icons/search.png"; // New search icon
import playIcon from "../icons/play.png"; // New play icon
import deleteIcon from "../icons/delete.png";
import editIcon from "../icons/edit.png"; // Updated edit icon
import favoriteIcon from "../icons/favorite.png";

const StreamList = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  // Add a new item to the list
  const addToList = () => {
    if (input.trim()) {
      setList([...list, { text: input, completed: false }]);
      setInput(""); // Clear input field
    }
  };

  // Toggle item completion
  const toggleComplete = (index) => {
    const updatedList = [...list];
    updatedList[index].completed = !updatedList[index].completed;
    setList(updatedList);
  };

  // Edit an item
  const editItem = (index) => {
    const newText = prompt("Edit the item:", list[index].text);
    if (newText) {
      const updatedList = [...list];
      updatedList[index].text = newText;
      setList(updatedList);
    }
  };

  // Delete an item
  const deleteItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>StreamList</h1>
      <div>
        <input
          type="text"
          placeholder="Enter movie or show"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addToList}>
          <img src={searchIcon} alt="Search" style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                flexGrow: 1,
              }}
            >
              {item.text}
            </span>
            <button>
              <img src={playIcon} alt="Play" style={{ width: "20px", height: "20px" }} />
            </button>
            <button onClick={() => toggleComplete(index)}>
              <img src={favoriteIcon} alt="Complete" style={{ width: "20px", height: "20px" }} />
            </button>
            <button onClick={() => editItem(index)}>
              <img src={editIcon} alt="Edit" style={{ width: "20px", height: "20px" }} />
            </button>
            <button onClick={() => deleteItem(index)}>
              <img src={deleteIcon} alt="Delete" style={{ width: "20px", height: "20px" }} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
