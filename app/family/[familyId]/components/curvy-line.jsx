import { LinkHorizontal } from "@visx/shape";

const CurvyLink = ({ linkData }) => {
  const { source, target } = linkData;

  // Calculate control points for smooth Bezier curves (you can adjust these values)
  const controlX = (source.x + target.x) / 2; // Midpoint for control point on x-axis

  const pathData = `
    M ${source.x},${source.y}
    C ${controlX},${source.y} ${controlX},${target.y} ${target.x},${target.y}
  `;

  return (
    <path
      d={pathData}
      fill="none"
      stroke="#000"
      strokeWidth="0.5"
      className="custom-link"
    />
  );
};

export default CurvyLink;
