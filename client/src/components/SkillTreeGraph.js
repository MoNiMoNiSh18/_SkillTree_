import React from "react";
import ReactFlow, {
  Background,
  Controls
} from "reactflow";

import "reactflow/dist/style.css";

function SkillTreeGraph({ have, missing }) {

  const allSkills = [...have, ...missing];

  const nodes = allSkills.map((skill, index) => ({

    id: `${index}`,

    data: {
      label: have.includes(skill)
        ? `✅ ${skill}`
        : `🔒 ${skill}`
    },

    position: {
      x: 250,
      y: index * 120
    },

    style: {
      padding: 10,
      borderRadius: 15,
      width: 220,
      border: have.includes(skill)
        ? "2px solid #22c55e"
        : "2px solid #ef4444",

      background: have.includes(skill)
        ? "#052e16"
        : "#450a0a",

      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    }

  }));

  const edges = allSkills.slice(1).map((_, index) => ({

    id: `e${index}-${index + 1}`,

    source: `${index}`,

    target: `${index + 1}`,

    animated: true
  }));

  return (

    <div
      style={{
        width: "100%",
        height: "600px",
        background: "#0f172a",
        borderRadius: "20px"
      }}
    >

      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >

        <Background />

        <Controls />

      </ReactFlow>

    </div>
  );
}

export default SkillTreeGraph;