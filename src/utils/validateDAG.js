export function validateDAG(nodes, edges) {
  const adjacency = {};
  nodes.forEach((node) => (adjacency[node.id] = []));
  edges.forEach((edge) => {
    if (edge.source === edge.target) return;
    adjacency[edge.source].push(edge.target);
  });

  let visited = {}, temp = {}, hasCycle = false;
  function dfs(node) {
    if (temp[node]) {
      hasCycle = true;
      return;
    }
    if (!visited[node]) {
      temp[node] = true;
      adjacency[node].forEach(dfs);
      temp[node] = false;
      visited[node] = true;
    }
  }

  nodes.forEach((node) => {
    if (!visited[node.id]) dfs(node.id);
  });

  const unconnected = nodes.filter(
    (n) =>
      !edges.some((e) => e.source === n.id || e.target === n.id)
  );

  const reasons = [];
  if (nodes.length < 2) reasons.push("At least 2 nodes required");
  if (hasCycle) reasons.push("Cycle detected");
  if (unconnected.length > 0)
    reasons.push("All nodes must be connected to an edge");

  return {
    valid: reasons.length === 0,
    reasons,
  };
}