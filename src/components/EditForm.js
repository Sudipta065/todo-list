import "../styles/style.css";

const EditForm = ({ currentTodo, setIsEditing, onEditInputChange, onEdit }) => {
  return (
    <>
      <h4>Update Todo</h4>{" "}
      <form onSubmit={onEdit} className="form">
        <div>
          <input
            className="input"
            name="updateTodo"
            type="text"
            placeholder="Update todo"
            value={currentTodo.text}
            onChange={onEditInputChange}
          />
          <button type="submit" onClick={onEdit} className="btn">
            Update
          </button>
          <button onClick={() => setIsEditing(false)} className="btn">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
export default EditForm;
