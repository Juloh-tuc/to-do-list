import "./TaskList.css";

const categoryData: { [key: string]: { color: string; emoji: string } } = {
  todo: { color: "#ffad60", emoji: "📝" },
  in_progress: { color: "#6ed4ff", emoji: "⏳" },
  done: { color: "#8d5fd3", emoji: "✅" },
};

function TaskList({
  tasks,
  onDeleteTask,
}: {
  tasks: { id: number; text: string; category: string }[];
  onDeleteTask: (id: number) => void;
}) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">Aucune tâche à afficher</p>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="task">
            <span className="task-text">{task.text}</span>
            <span
              className="category-badge"
              style={{
                backgroundColor: categoryData[task.category]?.color || "#ccc",
              }}
            >
              {categoryData[task.category]?.emoji || "❓"} {task.category}
            </span>
            <button
              type="button"
              className="delete-btn"
              onClick={() => onDeleteTask(task.id)}
            >
              ❌
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

export default TaskList;
