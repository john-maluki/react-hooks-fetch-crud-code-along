import React, { useState } from "react";

function ItemForm({ onItemCreate }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const createShoppingList = (e) => {
    e.preventDefault();
    const newShoppingList = {
      name,
      category,
    };
    fetch(`http://localhost:4000/items`, {
      method: "POST",
      body: JSON.stringify(newShoppingList),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((item) => onItemCreate(item));
  };

  return (
    <form className="NewItem" onSubmit={createShoppingList}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
