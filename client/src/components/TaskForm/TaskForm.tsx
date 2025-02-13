import { useState } from "react";
import "./TaskForm.css";

const categories = [
  { name: "À faire", value: "todo", emoji: "📝" },
  { name: "En cours", value: "in_progress", emoji: "⏳" },
  { name: "Terminée", value: "done", emoji: "✅" },
];

function TaskForm({
  onAddTask,
}: { onAddTask: (title: string, status: string) => void }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text, category);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ajouter une tâche..."
        required
        className="task-input"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-select"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.emoji} {cat.name}
          </option>
        ))}
      </select>
      <button className="add-task-btn" type="submit">
        ➕ Ajouter
      </button>
    </form>
  );
}

export default TaskForm;
