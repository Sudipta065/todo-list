import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import EditForm from "./components/EditForm";
import "./styles/style.css";

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [progressTodo, setProgressTodo] = useState([]);
  const [completeTodo, setCompleteTodo] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isProgress, setIsProgess] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    let newTodos = todos;
    let sortedTodos = newTodos.sort((a, b) => {
      return new Date(b.id) - new Date(a.id);
    });
    let proTodo = todos.filter((todo) => {
      return todo.isProgress === true;
    });

    setProgressTodo(proTodo);

    let comTodo = todos.filter((todo) => {
      return todo.isCompleted === true;
    });

    setCompleteTodo(comTodo);

    //  console.log(sortedTodos);
    localStorage.setItem("todos", JSON.stringify(sortedTodos));
  }, [todos]);

  const handleAddInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        {
          id: new Date(),
          text: todo.trim(),
          isProgress: isProgress,
          isCompleted: isCompleted,
        },
        ...todos,
      ]);
    }

    setTodo("");
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };
  const handleProgressClick = (id) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? { isProgress: true, isCompleted: false } : todo;
    });

    const progressTodo = todos.filter((todo) => {
      return todo.isProgress !== false;
    });
    setTodos(updatedItem);
    setProgressTodo(progressTodo);
  };
  const handleCompleteClick = (id) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? { isCompleted: true, isProgress: false } : todo;
    });

    const comPletedTodo = todos.filter((todo) => {
      return todo.isProgress !== false;
    });
    setTodos(updatedItem);
    setProgressTodo(comPletedTodo);
  };
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  return (
    <div className="App">
      <div className="container">
        <h2 className="big-title">Todo App</h2>

        <div> Todo</div>

        <div className="form-container">
          {isEditing ? (
            <EditForm
              currentTodo={currentTodo}
              setIsEditing={setIsEditing}
              onEditInputChange={handleEditInputChange}
              onEdit={handleEditFormSubmit}
            />
          ) : (
            <TodoForm
              todo={todo}
              onAddInputChange={handleAddInputChange}
              onAddFormSubmit={handleAddFormSubmit}
            />
          )}
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              handleProgress={handleProgressClick}
              handleCompleted={handleCompleteClick}
            />
          ))}
        </div>
        <div>
          progress
          {progressTodo.map((todo) => {
            return (
              <TodoItem
                todo={todo}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            );
          })}
        </div>

        <div>
          completed
          {completeTodo.map((todo) => (
            <TodoItem
              todo={todo}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;
