export default function ControlsPanel({ onDelete, onValidate }) {
  return (
    <div className="controls">
      <button onClick={onDelete}>🗑 Delete</button>
      <button onClick={onValidate}>✅ Validate DAG</button>
    </div>
  );
}