import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
  Background,  
  MarkerType 
} from "react-flow-renderer";

import { v4 as uuidv4 } from "uuid";
import { validateDAG } from "../utils/validateDAG";
import NodePanel from "./NodePanel";
import ControlsPanel from "./Controls";
import DAGValidator from "./DAGValidator";


function FlowCanvas() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dagStatus, setDagStatus] = useState({ valid: false, reasons: [] });
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);


const onConnect = useCallback((params) => {
  const newEdge = {
    ...params,
    id: uuidv4(),
    type: 'default',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  };
  setEdges((eds) => addEdge(newEdge, eds));
}, []);


  const onAddNode = () => {
    const label = prompt("Enter node label:");
    if (!label) return;
    const id = uuidv4();
    const newNode = {
      id,
      data: { label },
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      type: "default",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const validate = () => {
    const result = validateDAG(nodes, edges);
    setDagStatus(result);
  };

  const handleDelete = useCallback(() => {
    const selectedNodeIds = selectedNodes.map((n) => n.id);
    setNodes((nds) => nds.filter((n) => !selectedNodeIds.includes(n.id)));
    setEdges((eds) =>
      eds.filter(
        (e) =>
          !selectedNodeIds.includes(e.source) &&
          !selectedNodeIds.includes(e.target) &&
          !selectedEdges.some((sel) => sel.id === e.id)
      )
    );
  }, [selectedNodes, selectedEdges]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Delete") {
        handleDelete();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleDelete]);

  return (
    <ReactFlowProvider>
      <div className="app-container">
        <NodePanel onAddNode={onAddNode} />
        <ControlsPanel onDelete={handleDelete} onValidate={validate} />
        <DAGValidator status={dagStatus} />
        <div className="canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onSelectionChange={({ nodes, edges }) => {
              setSelectedNodes(nodes);
              setSelectedEdges(edges);
            }}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
        
      </div>
    </ReactFlowProvider>
  );
}

export default FlowCanvas;
