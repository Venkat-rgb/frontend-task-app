const TaskCard = ({ task, updateHandler, deleteTaskHandler }) => {
  return (
    <div className="bg-white p-4 flex items-center justify-between">
      <div>
        <p className="text-lg font-semibold">{task.title}</p>
        <p>{task.description}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onClick={() => updateHandler(task._id)}
        />
        <button
          type="button"
          onClick={() => deleteTaskHandler(task._id)}
          className="w-full bg-[#333] px-5 py-2 rounded text-[#f1f1f1]"
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
