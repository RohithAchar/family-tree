import { LinkHorizontal } from "@visx/shape";

const CurvyLink = ({ linkData }) => (
  <LinkHorizontal
    data={linkData}
    fill="none"
    stroke="#000"
    strokeWidth="1"
    className="custom-link"
  />
);

export default CurvyLink;
