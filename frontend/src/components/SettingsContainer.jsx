import { DatePicker, SpinButton, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function CustomTextField({ textLabel, textValue, textOnChange }) {
  return (
    <TextField
      label={textLabel}
      id="customInput"
      value={textValue}
      onChange={textOnChange}
    />
  );
}

function CustomDatePicker({ dateLabel, dateValue, dateOnChange }) {
  return (
    <DatePicker
      label={dateLabel}
      id="date"
      onChange={dateValue}
      value={dateOnChange}
    />
  );
}

function CustomSpinButton({ spinLabel, spinOnChange }) {
  return (
    <SpinButton label={spinLabel} onChange={spinOnChange} id="spinButton" />
  );
}

export default function SettingsContainer() {
  const [formData, setFormData] = useState({});

  const [isSettings, setIsSettings] = useState(false);
  const [componentTwo, setComponentTwo] = useState([]);
  const [componentOne, setComponentOne] = useState([
    {
      id: "6eb3e6bc-2b2e-11ee-be56-0242ac120002",
      name: "CustomTextField",
      component: CustomTextField,
    },
    {
      id: "6eb3e950-2b2e-11ee-be56-0242ac120002",
      name: "CustomDatePicker",
      component: CustomDatePicker,
    },
    {
      id: "6eb3ea9a-2b2e-11ee-be56-0242ac120002",
      name: "CustomiSpinButton",
      component: CustomSpinButton,
    },
  ]);

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const updatedComponentArray = [...componentOne];
    updatedComponentArray[index].props.value = value;
    setComponentOne(updatedComponentArray);

    console.log(value);
  };

  const reorder = (list, source, destination) => {
    const result = [...list];
    const startIndex = source.index;
    const endIndex = destination.index;

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    console.log(result, "REORDERING");

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = [...source];
    const destClone = [...destination];
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {
      sourceList: sourceClone,
      destinationList: destClone,
    };

    // result[droppableSource.droppableId] = sourceClone;
    // result[droppableDestination.droppableId] = destClone;

    console.log(result, "MOVING");

    return result;
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // console.log("HANDLE DRAG");
    // console.log("HANDLE DRAG SOURCE", source);
    // console.log("HANDLE DRAG DEST", destination);

    const destId = destination.droppableId;
    const srcId = source.droppableId;

    const destIndex = destination.index;
    const srcIndex = source.index;

    if (!destination) return;

    if (destId === srcId && destIndex === srcIndex) return;

    if (destId === srcId) {


      if (srcId == "ContainerOne") {
        const reorderedList = reorder(componentOne, srcIndex, destIndex);
        setComponentOne(reorderedList)
      }

      if (srcId == "ContainerOne") {
        const reorderedList = reorder(componentTwo, srcIndex, destIndex);
        setComponentTwo(reorderedList)
      }

    } else if (srcId === "ContainerOne") {
      const { sourceList, destinationList } = move(
        componentOne,
        componentTwo,
        source,
        destination
      );
      setComponentOne(sourceList);
      setComponentTwo(destinationList);
    } else if (srcId === "ContainerTwo") {
      const { sourceList, destinationList } = move(
        componentOne,
        componentTwo,
        source,
        destination
      );
      setComponentTwo(sourceList);
      setComponentOne(destinationList);
    }
  };


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <section className="w-[80%] h-[440px] flex items-center gap-4 border-2 border-black p-4 mx-auto mt-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSettings(!isSettings);
          }}
          className="w-20 h-10 bg-red-500 self-start"
        >
          {isSettings ? "ON" : "OFF"}
        </button>

        {/* CONTAINER 1 - DROPABLE 1 */}
        <Droppable droppableId="ContainerOne">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="border-2 border-black p-4 h-full flex flex-col gap-2 w-[440px]"
            >
              <h1 className="font-semibold text-center">CONTAINER 1</h1>
              {/* DRAGGABLE */}
              {componentOne.map(
                ({component: Component, id}, index) => (
                  <Draggable
                    draggableId={id}
                    index={index}
                    key={id}
                    isDragDisabled={isSettings}
                    // disableInteractiveElementBlocking
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        
                      >
                        <Component
                          textLabel={"Hello World"}
                          spinLabel={"Spin"}
                          dateLabel={"Date Here"}
                        />

                        {/* <div className="text-center p-2 font-semibold border-2 border-black">
                          {Component.name}
                        </div> */}
                      </div>
                    )}
                  </Draggable>
                )
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* CONTAINER 2 - DROPABLE 1 */}
        <Droppable droppableId="ContainerTwo">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="border-2 border-black p-4 h-full flex flex-col gap-2 w-full bg-red-500"
            >
              <h1 className="font-semibold text-center">CONTAINER 2</h1>
              {/* DRAGGABLE */}
              {componentTwo.map(
                ({ component: Component, id }, index) => (
                  <Draggable
                    draggableId={id}
                    index={index}
                    key={id}
                    isDragDisabled={isSettings}
                    // disableInteractiveElementBlocking
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <Component />
                      </div>
                    )}
                  </Draggable>
                )
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </section>
    </DragDropContext>
  );
}

// const handleInputChange = (event, index) => {
//   const { value } = event.target;
//   const updatedComponentArray = [...componentArray];
//   updatedComponentArray[index].props.value = value;
//   setComponentArray(updatedComponentArray);

//   console.log(value, 'AAAA')
// };

const componentList = [
  {
    id: "textField02",
    name: "customTextField",
    component: CustomTextField,
    props: {
      label: "CUSTOMIZE_TEXT_FIELD",
      value: "",
      onChange: (e) => handleInputChange(e, 0),
    },
  },
  {
    id: "datePicker02",
    name: "CustomDatePicker",
    component: CustomDatePicker,
    props: {
      label: "CUSTOMIZE_DATE_PICKER",
      value: "",
      onChange: (e) => handleInputChange(e, 1),
    },
  },
  {
    id: "spinButton02",
    name: "CustomiSpinButton",
    component: CustomSpinButton,
    props: {
      label: "CUSTOMIZE_SPIN_BUTTON",
      value: "0",
      onChange: (e) => handleInputChange(e, 2),
    },
  },
];
