import { useState, useEffect } from "react";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  return list ? JSON.parse(list) : [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
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
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  return (
    <main>
      <section className="container">
        <form onSubmit={handleSubmit}>
          <h3>Grocery Bud</h3>
          <div className="form-control">
            <input
              type="text"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
          </div>
        </form>
        <div className="list">
          {list.map((item) => (
            <article key={item.id} className="item">
              <p>{item.title}</p>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditID(item.id);
                  setName(item.title);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => setList(list.filter((i) => i.id !== item.id))}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
