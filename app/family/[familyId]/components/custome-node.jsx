"use client";

const CustomNode = ({ nodeDatum, toggleNode }) => {
  const handleAddChild = (parentId) => {
    const currentPath = window.location.href;
    window.location.href = `${currentPath}/new-child/${parentId}`;
  };
  const handleAddSpouse = (partnerId) => {
    const currentPath = window.location.href;
    window.location.href = `${currentPath}/new-spouse/${partnerId}`;
  };

  return (
    <g
      onClick={() => {
        console.log(nodeDatum);
      }}
    >
      <rect
        className="node"
        width="200"
        height="80"
        x="-100"
        y="-40"
        rx="16"
        ry="16"
        stroke="none"
        fill={nodeDatum.attributes?.gender === "male" ? "#E9EAFD" : "#FDE9F9"}
      />
      <text
        className="semi-bold"
        fill="black"
        strokeWidth="0.4"
        x="-80"
        y="-15"
      >
        {nodeDatum.name}
      </text>
      <text className="normal" fill="black" strokeWidth="0.1" x="-80" y="5">
        DOB: {nodeDatum.attributes?.dob}
      </text>
      <text className="normal" fill="black" strokeWidth="0.1" x="-80" y="25">
        {nodeDatum.attributes?.alive ? "Alive" : "Deceased"}
      </text>
      {/* Add child */}
      <circle
        cx="0"
        cy="40"
        r="8"
        fill="#f1ffa1"
        stroke="black"
        strokeWidth="0.5"
        onClick={() => handleAddChild(nodeDatum.id)}
      ></circle>
      {/* Add spouse */}
      {!nodeDatum.spouse && (
        <circle
          cx="100"
          cy="0"
          r="8"
          fill="#f1ffa1"
          stroke="black"
          strokeWidth="0.5"
          onClick={() => handleAddSpouse(nodeDatum.id)}
        ></circle>
      )}

      {/* Render spouse if exists */}
      {nodeDatum.spouse && (
        <g>
          <rect
            width="200"
            height="80"
            x="110"
            stroke="none"
            y="-40"
            rx="16"
            ry="16"
            fill={
              nodeDatum.spouse.attributes?.gender === "male"
                ? "#E9EAFD"
                : "#FDE9F9"
            }
          />
          <text
            className="semi-bold"
            fill="black"
            strokeWidth="0.4"
            x="130"
            y="-15"
          >
            {nodeDatum.spouse.name}
          </text>
          <text className="normal" fill="black" strokeWidth="0.1" x="130" y="5">
            DOB: {nodeDatum.spouse.attributes?.dob}
          </text>
          <text
            className="normal"
            fill="black"
            strokeWidth="0.1"
            x="130"
            y="25"
          >
            {nodeDatum.spouse.attributes?.alive ? "Alive" : "Deceased"}
          </text>
        </g>
      )}
    </g>
  );
};

export default CustomNode;
