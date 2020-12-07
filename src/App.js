import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Brand from "./components/Brand";
import AddForm from "./components/AddForm";
import Item from "./components/Item";
import { areArraysEqual } from "./utils";
import { LOCAL_STORAGE_KEYS } from "./constants";
import { usePrevious } from "./hooks/usePrevious";

const App = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ITEMS)) || []
  );
  const oldItems = usePrevious(items);
  const itemsCount = items.length;

  useEffect(() => {
    if (!oldItems) return;

    if (!areArraysEqual(items, oldItems)) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ITEMS, JSON.stringify(items));
    }
  }, [items]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleItemAdd = (item) => {
    const newItems = [...items, item];

    setItems(newItems);
  };

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  const handleCheck = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const item = { ...items[index] };
    const newItems = [...items];
    const newItem = { ...item, isChecked: !item.isChecked };
    newItems.splice(index, 1, newItem);

    setItems(newItems);
  };

  const handleDelete = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const newItems = [...items];
    newItems.splice(index, 1);

    setItems(newItems);
  };

  const handleSave = (id, content) => {
    const index = items.findIndex((item) => item.id === id);
    const item = { ...items[index] };
    const newItems = [...items];
    const newItem = { ...item, content };
    newItems.splice(index, 1, newItem);

    setItems(newItems);
  };

  const handleClear = () => {
    setItems([]);
  };

  return (
    <>
      <Brand />
      <AddForm onItemAdd={handleItemAdd} />
      {!itemsCount ? (
        <p>Seems like your list is empty. Don't be shy, add some items.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                className="shoplist"
                {...provided.droppableProps}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Item
                        provided={provided}
                        data={item}
                        onCheck={() => handleCheck(item.id)}
                        onDelete={() => handleDelete(item.id)}
                        onSave={(content) => handleSave(item.id, content)}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <button
            className="button button--danger clear-all"
            onClick={handleClear}
          >
            Clear all items
          </button>
        </DragDropContext>
      )}
    </>
  );
};

export default App;
