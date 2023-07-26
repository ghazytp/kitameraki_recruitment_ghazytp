import { TextField } from "@fluentui/react";
import { Draggable } from "react-beautiful-dnd";

export default function TitleTextField({
  titleValue,
  titleOnChange,
  dragId,
  index,
  isDragDisabled,
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
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          className={isForm ? '' : "p-2 border-2 border-black"}
        >
          <TextField
            onChange={titleOnChange}
            value={titleValue}
            label="TItle"
            required
            id="title"
          />
        </div>
      )}
    </Draggable>
  );
}
