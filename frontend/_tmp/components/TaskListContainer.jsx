import { useEffect, useRef, useState } from "react";
import TaskCard from "./TaskCard";
import TaskListPagination from "./TaskListPagination";

export default function TaskListContainer({
  allTaskData,
  fetchTasksData,
  getTaskDetailId,
  deleteTaskById,
  closeAddForm,
}) {
  const [tasks, setTasks] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState([]);
  const [loading, setLoading] = useState(false);
  const taskListWindowRef = useRef(null);

  const handleScroll = () => {
    const element = taskListWindowRef.current;

    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // Load more data when reaching the bottom
      fetchMoreData();
    }
  };

  const fetchMoreData = () => {
    if (loading || pageNum >= totalPageNum.length) {
      return;
      // Do nothing if already loading
    }

    setLoading(true);

    // Simulate loading using timeout 1 s
    setTimeout(() => {
      const nextPage = pageNum + 1;
      fetchTasksData(nextPage); // fetch next task data
      setPageNum(nextPage);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const element = taskListWindowRef.current;

    // Listen scroll event on task-list-window
    if (element) element.addEventListener("scroll", handleScroll);

    return () => {
      if (element) element.removeEventListener("scroll", handleScroll);
    };
  }, [tasks]);

  useEffect(() => {
    const { currentPage, totalPage, data } = allTaskData;
    setTasks(data);
    setPageNum(currentPage);

    // Set how much page button change int n to array with n length
    const totalPageArr =
      Array.from({ length: totalPage }, (_, index) => index + 1) || 1;
    setTotalPageNum(totalPageArr);
  }, [allTaskData]);

  return (
    <div className="border-2 border-black rounded-sm p-2 pb-4 flex flex-col justify-around w-[440px]">
      <p className="text-2xl font-semibold px-2">Task List</p>
      <div
        id="task-list-window"
        ref={taskListWindowRef}
        className="flex flex-col items-center overflow-y-auto no-scrollbar w-full h-[380px] px-2 gap-2 mt-2"
      >
        {tasks?.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              getTaskDetailId={getTaskDetailId}
              deleteTaskById={deleteTaskById}
              closeAddForm={closeAddForm}
            />
          );
        })}
        {loading && <p>Loading...</p>}
      </div>

      <TaskListPagination
        totalPageNum={totalPageNum}
        fetchTasksData={fetchTasksData}
        pageNum={pageNum}
      />
    </div>
  );
}
