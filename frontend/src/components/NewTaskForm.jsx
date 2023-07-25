import { DefaultButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import { useState } from "react";

export default function NewTaskForm({ createNewTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    const name = e.target.id;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      createNewTask(formData);

      setFormData({});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-2 border-black rounded-sm px-4 py-2 pb-4 w-[440px] transition-all">
      <p className="text-2xl font-semibold">Create New Task</p>
      <form
        onSubmit={handleOnSubmit}
        className="w-full mt-2 flex flex-col gap-2"
      >
        <TextField
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
          className="w-fit bg-yellow-200"
        />
      </form>
    </div>
  );
}
