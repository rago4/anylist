import React, { useState } from "react";
import { getUniqId } from "../utils";

const AddForm = ({ onItemAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = value.trim();

    if (!content.length) return;

    const newItem = {
      id: getUniqId(),
      content,
      isChecked: false,
    };

    onItemAdd(newItem);
    setValue("");
  };

  const handleChange = ({ target: { value } }) => setValue(value);

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-form">
        <input
          className="add-form__input input"
          type="text"
          placeholder="Add new item"
          value={value}
          onChange={handleChange}
        />
        <button className="button">Add</button>
      </div>
    </form>
  );
};

export default AddForm;
