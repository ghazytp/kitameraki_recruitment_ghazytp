import { TextField } from "@fluentui/react";
import { Draggable } from "react-beautiful-dnd";

export default function CustomTextField({
  textId,
  textValue,
  textOnChange,
  dragId,
  index,
  isDragDisabled,
  multiline,
  isForm
}) {
  return (
    <Draggable
      draggableId={dragId}
      key={dragId}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={isForm ? '' : "p-2 border-2 border-black"}
        >
          <TextField
            label="Custom Input"
            id={textId}
            value={textValue}
            multiline={multiline}
            onChange={textOnChange}
          />
        </div>
      )}
    </Draggable>
  );
}
