import { useEffect, useState } from "react";
import { BASE_URL_TASKS } from "./constants/constants";
import axios from "axios";
import SideNav from "./components/SideNav";
import TaskListContainer from "./components/TaskListContainer";
import TaskDetailContainer from "./components/TaskDetailContainer";
import NewTaskForm from "./components/NewTaskForm";
import SettingsV2 from "./components/SettingsV2";
import { DragDropContext } from "react-beautiful-dnd";
import CustomTextField from "./components/dragComponents/CustomTextField";
import CustomDatePicker from "./components/dragComponents/CustomDatePicker";
import CustomSpinButton from "./components/dragComponents/CustomSpinButton";
import TitleTextField from "./components/dragComponents/TitleTextField";
import DescriptionTextField from "./components/dragComponents/DescriptionTextField";
import CustomSubmitButton from "./components/dragComponents/CustomSubmitButton";

const menuComponentData = [
  {
    componentId: "6eb3ea9a-2b2e-11ee-be56-0242ac120002",
    componentName: "CustomTextField",
    component: CustomTextField,
  },
  {
    componentId: "6eb3ebbc-2b2e-11ee-be56-0242ac120002",
    componentName: "CustomDatePicker",
    component: CustomDatePicker,
  },
  {
    componentId: "6eb3ece8-2b2e-11ee-be56-0242ac120002",
    componentName: "CustomSpinButton",
    component: CustomSpinButton,
  },
];

const formComponentData = [
  {
    componentId: "6eb3e6bc-2b2e-11ee-be56-0242ac120002",
    componentName: "TitleTextField",
    component: TitleTextField,
  },
  {
    componentId: "6eb3e950-2b2e-11ee-be56-0242ac120002",
    componentName: "DescTextField",
    component: DescriptionTextField,
  },
  {
    componentId: "6eb3f2e2-2b2e-11ee-be56-0242ac120002",
    componentName: "SubmitButton",
    component: CustomSubmitButton,
  },
];

function App() {
  const [formComponent, setFormComponent] = useState(formComponentData);
  const [menuComponent, setMenuComponent] = useState(menuComponentData);
  const [allTaskData, setAllTaskData] = useState({});
  const [taskDetailId, setTaskDetailId] = useState(0);
  const [isFormSettings, setIsFormSettings] = useState(false);
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
      setTaskDetailId(0);
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
    if (isFormSettings) {
      setIsAddForm(true);
    }
  };

  const closeAddForm = () => {
    setIsAddForm(false);
  };

  const handleSettings = () => {
    setIsFormSettings(!isFormSettings);
    setIsAddForm(true);
  };

  // CUSTOM DND FORM //

  const reorder = (list, source, destination) => {
    const result = [...list];
    const startIndex = source.index;
    const endIndex = destination.index;

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

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


    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    const destId = destination.droppableId;
    const srcId = source.droppableId;

    const destIndex = destination.index;
    const srcIndex = source.index;

    if (!destination) return;

    if (destId === srcId && destIndex === srcIndex) return;

    if (srcId === destId && destId === "Menu") return;

    if (destId === srcId) {
      const reorderedList = reorder(formComponent, source, destination);
      setFormComponent(reorderedList);
    } else {

      if (destId === 'Form') {
        const { sourceList, destinationList } = move(menuComponent, formComponent, source, destination)
        setMenuComponent(sourceList)
        setFormComponent(destinationList)
      }

      if (destId === 'Menu') {
        const { sourceList, destinationList } = move(formComponent, menuComponent, source, destination)
        setFormComponent(sourceList)
        setMenuComponent(destinationList)
      }

    }

    
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className=" flex-col border-2 border-black px-6 pb-6 pt-2 mx-auto mt-20 rounded-sm w-fit">
        <div className="flex justify-between mb-2 mt-1 items-center">
          <h1 className="mb-3 font-semibold text-3xl">Task Management App</h1>
          <h1 className="mb-3 font-semibold ">Sunday, 24 Mar 1999</h1>
        </div>
        <div className="flex gap-4">
          <SideNav
            isAddForm={isAddForm}
            handleAddForm={handleAddForm}
            isFormSettings={isFormSettings}
            handleSettings={handleSettings}
          />
          {isFormSettings ? (
            <SettingsV2
              formComponent={formComponent}
              setFormComponent={setFormComponent}
              menuComponent={menuComponent}
              setMenuComponent={setMenuComponent}
            />
          ) : (
            <TaskListContainer
              allTaskData={allTaskData}
              fetchTasksData={fetchTasksData}
              getTaskDetailId={getTaskDetailId}
              deleteTaskById={deleteTaskById}
              closeAddForm={closeAddForm}
            />
          )}

          {!isAddForm ? (
            <TaskDetailContainer
              taskDetailId={taskDetailId}
              editTaskById={editTaskById}
            />
          ) : (
            <NewTaskForm
              createNewTask={createNewTask}
              formComponent={formComponent}
              setFormComponent={setFormComponent}
              menuComponent={menuComponent}
              setMenuComponent={setMenuComponent}
              isFormSettings={isFormSettings}
            />
          )}
        </div>
      </section>
      {/* <SettingsContainer  /> */}
    </DragDropContext>
  );
}

export default App;
