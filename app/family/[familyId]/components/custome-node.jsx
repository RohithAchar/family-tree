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
  const handleNodeClick = (id) => {
    const currentPath = window.location.href;
    window.location.href = `${currentPath}/${id}`;
  };

  return (
    <g>
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
        onClick={() => {
          handleNodeClick(nodeDatum.id);
        }}
      />
      <text className="semi-bold" fill="black" strokeWidth="0.4" x="-80" y="5">
        {nodeDatum.name}
      </text>
      <text className="normal" fill="black" strokeWidth="0.1" x="-80" y="20">
        DOB: {nodeDatum.attributes?.dob}
      </text>
      {/* <text className="normal" fill="black" strokeWidth="0.1" x="-80" y="25">
        {nodeDatum.attributes?.alive ? "Alive" : "Deceased"}
      </text> */}
      {/* Image */}
      <svg
        x="-25"
        y="-65"
        width="52"
        height="52"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="circle-clip">
            <circle cx="24" cy="24" r="24" />
          </clipPath>
        </defs>
        <image
          href="/spiderman.jpeg"
          x="0"
          y="0"
          width="52"
          height="52"
          clip-path="url(#circle-clip)"
        />
      </svg>

      {/* Add child */}
      <circle
        cx="0"
        cy="40"
        r="8"
        fill="#ecfccb"
        stroke="#365314"
        strokeWidth="0.4"
        onClick={() => handleAddChild(nodeDatum.id)}
      ></circle>

      {/* Add spouse */}
      {!nodeDatum.spouse && (
        <circle
          cx="100"
          cy="0"
          r="8"
          fill="#ffe4e6"
          stroke="#881337"
          strokeWidth="0.4"
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
            y="5"
          >
            {nodeDatum.spouse.name}
          </text>
          <text
            className="normal"
            fill="black"
            strokeWidth="0.1"
            x="130"
            y="20"
          >
            DOB: {nodeDatum.spouse.attributes?.dob}
          </text>
          {/* Image */}
          {/* <text
            className="normal"
            fill="black"
            strokeWidth="0.1"
            x="130"
            y="25"
          >
            {nodeDatum.spouse.attributes?.alive ? "Alive" : "Deceased"}
          </text> */}
        </g>
      )}

      {nodeDatum.spouse && (
        <svg
          x="185"
          y="-65"
          width="52"
          height="52"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="circle-clip">
              <circle cx="26" cy="26" r="26" />
            </clipPath>
          </defs>
          <image
            href="/spiderman.jpeg"
            x="0"
            y="0"
            width="52"
            height="52"
            clip-path="url(#circle-clip)"
          />
        </svg>
      )}
    </g>
  );
};

export default CustomNode;
