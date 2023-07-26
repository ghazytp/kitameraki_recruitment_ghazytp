import { SpinButton } from "@fluentui/react";
import { Draggable } from "react-beautiful-dnd";

export default function CustomSpinButton({
  spinValue,
  spinOnChange,
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
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={isForm ? '' : "p-2 border-2 border-black"}
        >
          <SpinButton
            label="Spin Button"
            onChange={spinOnChange}
            step={1}
            min={0}
            max={10000}
            name="spinButton"
          />
        </div>
      )}
    </Draggable>
  );
}
