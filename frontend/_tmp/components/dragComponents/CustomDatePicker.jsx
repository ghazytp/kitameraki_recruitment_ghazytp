import { DatePicker } from "@fluentui/react";
import { Draggable } from "react-beautiful-dnd";

export default function CustomDatePicker({
  dateLabel,
  dateValue,
  dateOnChange,
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
          <DatePicker
            label="Date Picker"
            id="date"
            onSelectDate={(date) => (dateValue({date: date }))}
            value={dateOnChange}
            // onSelectDate={}
          />
        </div>
      )}
    </Draggable>
  );
}
