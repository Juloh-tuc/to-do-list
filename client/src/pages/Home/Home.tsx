import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import TaskList from "../../components/TaskList/TaskList";
import TaskForm from "../../components/TaskForm/TaskForm";

function Home() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; category: string }[]
  >([]);
  const [filter, setFilter] = useState<string>("Toutes");

  const userName = localStorage.getItem("userName");

  const fetchTasks = useCallback(async () => {
    if (!userName) return;
    try {
      const response = await axios.get(
        `http://localhost:3310/api/tasks/${userName}`,
      );
      const formattedTasks = response.data.map(
        (task: { id: number; title: string; status: string }) => ({
          id: task.id,
          text: task.title,
          category: task.status,
        }),
      );
      setTasks(formattedTasks);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erreur Axios :", err.response?.data || err.message);
    }
  }, [userName]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title: string, status: string) => {
    if (!userName) return alert("Vous devez être connecté !");
    try {
      await axios.post("http://localhost:3310/api/tasks", {
        title,
        user: userName,
        status,
      });
      await fetchTasks();
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erreur Axios :", err.response?.data || err.message);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3310/api/tasks/${id}`);
      await fetchTasks();
    } catch (error) {
      const err = error as AxiosError;
      console.error("Erreur Axios :", err.response?.data || err.message);
    }
  };

  const filteredTasks =
    filter === "Toutes"
      ? tasks
      : tasks.filter((task) => task.category === filter);

  return (
    <div className="home-container">
      <h1>
        {userName
          ? `Bienvenue ${userName} !`
          : "Bienvenue sur votre To-Do List !"}
      </h1>
      <div className="task-section">
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} />
      </div>
      <div className="filter-container">
        <label htmlFor="categoryFilter">Filtrer par statut :</label>
        <select
          id="categoryFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Toutes">Toutes</option>
          <option value="todo">À faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminées</option>
        </select>
      </div>
    </div>
  );
}

export default Home;