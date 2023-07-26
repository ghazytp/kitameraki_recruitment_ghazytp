import { SpinButton } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

export default function NewTaskForm({
  createNewTask,
  menuComponent,
  setMenuComponent,
  formComponent,
  setFormComponent,
  isFormSettings
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log(formData)
    const name = e.target.id;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectDate = (date) => {
    setFormData({...formData, ...date})
  }

  const handleSpinButton = (e, val) => {
    e.preventDefault()
    const data = {
      spinButton : val
    }
    setFormData({...formData, ...data})
  }

  const handleOnSubmit = async (e) => {
    try {
      console.log(formData, 'ON SUBMIT')
      e.preventDefault();

      createNewTask(formData);

      setFormData({});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Droppable droppableId="Form">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="border-2 border-black rounded-sm px-4 py-2 pb-4 w-[440px] h-[490px] overflow-y-auto no-scrollbar transition-all"
        >
          <p className="text-2xl font-semibold">Create New Task</p>
          <form
            onSubmit={handleOnSubmit}
            className="w-full mt-2 flex flex-col gap-2"
          >
            {formComponent.map(
              ({ component: Component, componentId: uid }, index) => (
                <Component
                  dragId={uid}
                  key={uid}
                  index={index}
                  isDragDisabled={!isFormSettings}
                  titleOnChange={handleOnChange}
                  textId={'customInput'}
                  textOnChange={handleOnChange}
                  descOnChange={handleOnChange}
                  dateValue={handleSelectDate}
                  spinOnChange={handleSpinButton}
                  isForm={true}

                />
              )
            )}
            {/* <TextField
              onChange={handleOnChange}
              label="Title"
              required
              id="title"
              value={formData.title || ""}
            />
            <TextField
              onChange={handleOnChange}
              label="Description"
              id="description"
              value={formData.description || ""}
              multiline
              rows={3}
            />
            <DefaultButton
              text="Submit"
              type="submit"
            /> */}
          </form>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
