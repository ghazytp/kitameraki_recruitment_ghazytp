import { useEffect, useReducer, useState } from "react";
import { BASE_URL_TASKS } from "./constants/constants";
import axios from "axios";
import SideNav from "./components/SideNav";
import TaskListContainer from "./components/TaskListContainer";
import TaskDetailContainer from "./components/TaskDetailContainer";
import NewTaskForm from "./components/NewTaskForm";

function App() {
  const [allTaskData, setAllTaskData] = useState({});
  const [taskDetailId, setTaskDetailId] = useState({});
  const [isHomePage, setIsHomePage] = useState(true);
  const [isAddForm, setIsAddForm] = useState(false);

  const fetchTasksData = async (page = 1) => {
    try {
      const { data } = await axios.get(`${BASE_URL_TASKS}?page=${page}`);


      setAllTaskData(data);

    } catch (err) {
      console.log(err);
    }
  };

  const getTaskDetailId = async (taskId) => {
    try {
      setTaskDetailId(taskId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTaskById = async (taskId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL_TASKS}/${taskId}`);

      fetchTasksData(allTaskData.currentPage);
      setTaskDetail({});
    } catch (err) {
      console.log(err);
    }
  };

  const createNewTask = async (taskData) => {
    try {
      const { data } = await axios.post(BASE_URL_TASKS, taskData);
      fetchTasksData();
    } catch (err) {
      console.log(err);
    }
  };

  const editTaskById = async (taskId, editedTask) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL_TASKS}/${taskId}`,
        editedTask
      );

      console.log(data, "EDITED");
      fetchTasksData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddForm = () => {
    setIsAddForm(!isAddForm);
  };

  const closeAddForm = () => {
    setIsAddForm(false);
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <section className="flex flex-col border-2 border-black px-6 pb-6 pt-2 mx-auto mt-20 rounded-sm w-fit">
      <div className="flex justify-between mb-2 mt-1 items-center">
        <h1 className="mb-3 font-semibold text-3xl">Task Management App</h1>
        <h1 className="mb-3 font-semibold ">Sunday, 24 Mar 1999</h1>
      </div>
      <div className="flex gap-4">
        <SideNav isAddForm={isAddForm} handleAddForm={handleAddForm} />
        <TaskListContainer
          allTaskData={allTaskData}
          fetchTasksData={fetchTasksData}
          getTaskDetailId={getTaskDetailId}
          deleteTaskById={deleteTaskById}
          closeAddForm={closeAddForm}

        />
        {!isAddForm ? (
          <TaskDetailContainer
            taskDetailId={taskDetailId}
            editTaskById={editTaskById}
          />
        ) : (
          <NewTaskForm createNewTask={createNewTask} />
        )}

        {/* <Sidebar isAddTask={isAddTask} isHome={changeForm} openAddForm={openAddForm} openSettings={openSettings}  />
        <TaskContainer tasks={tasks} fetchTaskData={fetchTaskData} getTaskDetail={getTaskDetail} deleteTaskById={deleteTaskById} />
        {!isAddTask ? (
          <TaskDetail taskData={taskDetail} setTaskDetail={setTaskDetail} />
        ) : (
          <TaskForm fetchTaskData={fetchTaskData}/>
        )} */}
      </div>
    </section>
  );
}

export default App;
