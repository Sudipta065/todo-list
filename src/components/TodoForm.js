import "../styles/style.css";

const TodoForm = ({ todo, onAddFormSubmit, onAddInputChange }) => {
  return (
    <>
      <h4>Create Todo</h4>{" "}
      <form onSubmit={onAddFormSubmit} className="form">
        <div>
          <input
            className="input"
            name="todo"
            type="text"
            placeholder="Create new todo"
            value={todo}
            onChange={onAddInputChange}
          />
          <button onClick={onAddFormSubmit} className="btn">
            Add Todo
          </button>
        </div>
      </form>
    </>
  );
};
export default TodoForm;
