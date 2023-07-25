import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_TASKS } from "../constants/constants";

export default function TaskDetailContainer({ taskDetailId, editTaskById }) {
  const [taskDetail, setTaskDetail] = useState({});
  const [editValue, setEditValue] = useState(taskDetail);

  // Get one task data by id
  const fetchTaskById = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL_TASKS}/${taskDetailId}`);

      setTaskDetail(data);
      setEditValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Change the edit value when user type new value
  const handleEditChange = (e) => {
    setEditValue({ ...editValue, [e.target.id]: e.target.value });
  };

  // Save the edited value when user press "enter" or "esc"
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
    }
  };

  // validate if the field empty & save the edit value
  const onBlur = (e) => {
    if (e.target.value.trim() === "") {
      setEditValue(taskDetail);
    } else {
      setTaskDetail(editValue);
      editTaskById(taskDetailId, editValue);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, [taskDetailId]);

  return (
    <div className="border-2 border-black rounded-sm px-4 py-2 flex justify-center pb-4 w-[440px] transition-all">
      {!taskDetail.title ? (
        <div className="flex flex-col items-center justify-center">
          <p>Task Preview</p>
          <p>No Task Selected</p>
        </div>
      ) : (
        <div className="w-full">
          <textarea
            rows={1}
            id="title"
            value={editValue.title}
            onChange={handleEditChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className="w-full outline-none text-2xl font-semibold hover:text-gray-500 cursor-pointer resize-none appearance-none"
          />
          <textarea
            rows={1}
            id="description"
            value={editValue.description}
            onChange={handleEditChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            className="w-full min-h-[200px]  cursor-pointer outline-none no-scrollbar resize-none appearance-none hover:bg-yellow-50 rounded-sm px-1"
          />
        </div>
      )}
    </div>
  );
}
