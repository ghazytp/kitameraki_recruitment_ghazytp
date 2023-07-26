import { Icon } from "@fluentui/react/lib/Icon";

export default function TaskCard({
  task,
  getTaskDetailId,
  deleteTaskById,
  closeAddForm,
}) {
  return (
    <div className="border-2 border-black flex items-center gap-4 px-4 py-2 rounded-sm shadow-sm transition-all hover:translate-x-1 duration-100 hover:bg-yellow-200 group w-full justify-between">
      {/* send the task id */}
      <button
        onClick={(e) => {
          e.preventDefault();
          getTaskDetailId(task.id);
          closeAddForm()
        }}
        className="text-left w-full"
      >
        <p className="font-semibold text-lg cursor-pointer group-hover:text-gray-700">
          {task.title}
        </p>
        <p className="text-sm group-hover:text-gray-500">
          {task.description?.length > 80
            ? `${task.description.substring(0, 96)}....`
            : task.description}
        </p>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          deleteTaskById(task.id);
        }}
        className="text-xl hover:text-red-900"
      >
        <Icon iconName="Delete" />
      </button>
    </div>
  );
}
