# Pipeline Editor – DAG Builder 

A ReactJS-based Pipeline Editor to visually construct and validate Directed Acyclic Graphs (DAGs). Designed for creating data pipelines, workflows, or process chains using drag-and-drop node connections.

## Demo

 Live Preview: [https://pipeline-editer-zds3.vercel.app/]  
 Demo Video: [(https://drive.google.com/file/d/1V1yNKeLqlERjiFpxnObfilWMR3fxVWk-/view?usp=sharing)]

---

##  Features

-  Add Nodes via UI
-  Connect Nodes with Directional Arrows
-  Delete Nodes/Edges using Delete key
-  Real-time DAG Validation:
  - At least 2 nodes
  - No cycles (Cycle Detection)
  - All nodes must be connected to at least one edge
  - No self-loops
-  Mini JSON DAG Preview
-  Graph Canvas with Zoom, Pan, Minimap, Background Grid

---

##  UI Overview

| Feature               | Description                                |
|----------------------|--------------------------------------------|
|  Add Node           | Opens a prompt to name a new node          |
|  Draw Edge          | Click on node handles to connect nodes     |
|  Delete Key         | Removes selected node or edge              |
|  Validate DAG       | Displays real-time DAG validity status     |
|  JSON Preview       | Shows structure of nodes & edges           |

---

##  Project Structure
src/
├── App.jsx
├── styles.css
├── components/
│   ├── Canvas.jsx
│   ├── Controls.jsx
│   ├── DAGValidator.jsx
│   ├── JSONPreview.jsx
│   └── NodePanel.jsx
└── utils/
    └── validateDAG.js
## Install Dependencies
npm install
npm start
