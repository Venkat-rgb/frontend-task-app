const TaskForm = ({
  title,
  setTitle,
  description,
  setDescription,
  isSubmitting,
  submitHandler,
}) => {
  return (
    <div className="border border-gray-300 p-4 space-y-3 bg-white">
      <h1 className="text-2xl font-semibold text-center">Task List</h1>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="text"
          placeholder="Enter your Title..."
          className="border border-gray-300 p-2 outline-none w-full"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="text"
          className="border border-gray-300 p-2 outline-none w-full"
          placeholder="Enter your Description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button
          type="submit"
          className="w-full bg-[#333] p-2 rounded text-[#f1f1f1]"
          disabled={isSubmitting}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
