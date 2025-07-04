export default function NodePanel({ onAddNode }) {
  return (
    <div className="controls">
      <button onClick={onAddNode}>➕ Add Node</button>
    </div>
  );
}