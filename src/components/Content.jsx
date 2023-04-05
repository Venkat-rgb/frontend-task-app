import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { API_URL } from "../config";
import { toast } from "react-hot-toast";

const Content = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const deleteTaskHandler = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/task/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message}`);

      toast.success(data.message);
      setRefetch((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/task/${id}`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message}`);

      toast.success(data.message);
      setRefetch((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const submitHandler = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/tasks/new`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message}`);

      toast.success(data.message);
      setIsSubmitting(false);
      setRefetch((prev) => !prev);

      setTitle("");
      setDescription("");
    } catch (err) {
      toast.error(err.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks/all`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Unable to get tasks!`);
        const data = await res.json();

        setTasks(data.tasks);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, [refetch]);

  return (
    <div className="w-[500px] h-[90vh] mx-auto mt-3">
      <TaskForm
        submitHandler={submitHandler}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        isSubmitting={isSubmitting}
      />
      <div className="h-[55vh] overflow-y-scroll flex flex-col gap-4 mt-4 pb-10">
        {tasks?.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            updateHandler={updateHandler}
            deleteTaskHandler={deleteTaskHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
