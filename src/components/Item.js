import React, { useState } from "react";
import Icon from "./Icon";

const Item = ({ provided, data, onCheck, onDelete, onSave }) => {
  const [isEditEnabled, setEdit] = useState(false);
  const [value, setValue] = useState(data.content);

  const handleChange = ({ target: { value } }) => setValue(value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = value.trim();

    if (!content.length) return;

    onSave(content);
    setEdit(false);
  };

  return (
    <li
      ref={provided.innerRef}
      className="shoplist__item"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="shoplist__checkbox-wrapper">
        <label>
          <input
            className="shoplist__checkbox"
            type="checkbox"
            checked={data.isChecked}
            onChange={onCheck}
          />
          <span className="shoplist__checkbox-styled">
            {data.isChecked && (
              <Icon id="check" className="shoplist__check-icon" />
            )}
          </span>
        </label>
        {isEditEnabled ? (
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Insert item content"
              value={value}
              onChange={handleChange}
            />
          </form>
        ) : (
          <span>{data.content}</span>
        )}
      </div>

      <div className="shoplist__buttons">
        <button
          className="shoplist__button button button--secondary"
          onClick={isEditEnabled ? handleSubmit : () => setEdit(true)}
        >
          <Icon
            id={isEditEnabled ? "save" : "edit"}
            className="shoplist__icon"
          />
        </button>

        <button
          className="shoplist__button button button--danger"
          onClick={onDelete}
        >
          <Icon id="trash" className="shoplist__icon" />
        </button>
      </div>
    </li>
  );
};

export default Item;
