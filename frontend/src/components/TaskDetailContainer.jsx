import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL_TASKS } from "../constants/constants";
import { DatePicker, SpinButton } from "@fluentui/react";

export default function TaskDetailContainer({ taskDetailId, editTaskById }) {
  const [taskDetail, setTaskDetail] = useState({});
  const [editValue, setEditValue] = useState(taskDetail);

  // Get one task data by id
  const fetchTaskById = async (taskId) => {
    try {
      // close preview if deleted
      if (!taskId) {
        setTaskDetail({});
        setEditValue({});

        return;
      }

      const { data } = await axios.get(`${BASE_URL_TASKS}/${taskId}`);

      setTaskDetail(data);
      setEditValue(data);
    } catch (err) {}
  };

  // Change the edit value when user type new value
  const handleEditChange = (e) => {
    setEditValue({ ...editValue, [e.target.id]: e.target.value });
  };

  const handleEditDate = (date) => {
    setEditValue({ ...editValue, ...date });
  };

  const handleDataOnBlur = () => {
    setTaskDetail(editValue);
    editTaskById(taskDetailId, editValue);
  };

  const handleSpinButton = (e, val) => {
    e.preventDefault();
    const data = {
      spinButton: val,
    };
    setEditValue({ ...editValue, ...data });
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
    fetchTaskById(taskDetailId);
  }, [taskDetailId]);

  return (
    <div className="border-2 border-black rounded-sm px-4 py-2 flex justify-center pb-4 w-[440px] h-[490px] transition-all">
      {!taskDetail.title ? (
        <div className="flex flex-col items-center justify-center">
          <p>Task Preview</p>
          <p>No Task Selected</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          <textarea
            rows={1}
            id="title"
            value={editValue.title}
            onChange={handleEditChange}
            onKeyDown={onKeyDown}
            className="w-full outline-none text-2xl font-semibold hover:text-gray-500 cursor-pointer resize-none appearance-none"
          />
          {!editValue.date ? (
            ""
          ) : (
            <DatePicker
              id="date"
              value={new Date(editValue.date)}
              onSelectDate={(date) => handleEditDate({ date: date })}
              onBlur={handleDataOnBlur}
              className="w-full outline-none font-semibold text-sm hover:text-gray-500 cursor-pointer resize-none appearance-none"
            />
          )}

          {!editValue.description ? (
            ""
          ) : (
            <textarea
              rows={1}
              id="description"
              value={editValue.description}
              onChange={handleEditChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              className="w-full min-h-[200px] flex-1 cursor-pointer outline-none no-scrollbar resize-none appearance-none rounded-sm px-1"
            />
          )}

          {!editValue.customInput ? (
            ""
          ) : (
            <div>
              <p>Notes :</p>
              <textarea
                rows={1}
                id="customInput"
                value={editValue.customInput}
                onChange={handleEditChange}
                onKeyDown={onKeyDown}
                className="w-full outline-none hover:text-gray-500 cursor-pointer resize-none appearance-none"
              />
            </div>
          )}

          {!editValue.spinButton ? (
            ""
          ) : (
            <div>
              <p>Spin Button :</p>
              <SpinButton
                value={editValue.spinButton}
                onChange={handleSpinButton}
                onBlur={handleDataOnBlur}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
