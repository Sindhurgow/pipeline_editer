export default function DAGValidator({ status }) {
  return (
    <div className={status.valid ? "valid" : "invalid"}>
      {status.valid ? "✅ DAG is valid" : status.reasons.join(", ")}
    </div>
  );
}