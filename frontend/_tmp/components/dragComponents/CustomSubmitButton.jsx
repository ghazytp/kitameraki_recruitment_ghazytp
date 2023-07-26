import { DefaultButton } from "@fluentui/react";
import { Draggable } from "react-beautiful-dnd";

export default function CustomSubmitButton({
  dragId,
  index,
  submitOnClick,
  isDragDisabled,
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
          className="py-2"
        >
          <DefaultButton type="submit" text="SUBMIT" onClick={submitOnClick} />
        </div>
      )}
    </Draggable>
  );
}
