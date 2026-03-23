import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const GroceryApp = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || [],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    if (isEditing) {
      setList(
        list.map((item) =>
          item.id === editID ? { ...item, title: name } : item,
        ),
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    } else {
      setList([
        ...list,
        { id: Date.now().toString(), title: name, completed: false },
      ]);
      setName("");
    }
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "add item"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        {list.map((item) => (
          <article key={item.id} className="grocery-item">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                setList(
                  list.map((i) =>
                    i.id === item.id ? { ...i, completed: !i.completed } : i,
                  ),
                )
              }
            />
            <p className={`title ${item.completed ? "completed" : ""}`}>
              {item.title}
            </p>
            <div className="btn-container">
              <button
                className="edit-btn"
                onClick={() => {
                  setIsEditing(true);
                  setEditID(item.id);
                  setName(item.title);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => setList(list.filter((i) => i.id !== item.id))}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        ))}
        {list.length > 0 && (
          <button className="clear-btn" onClick={() => setList([])}>
            clear items
          </button>
        )}
      </div>
    </section>
  );
};

export default GroceryApp;
