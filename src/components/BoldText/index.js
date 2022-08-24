import { Typography } from "@mui/material";
const BoldText = ({ children }) => {
  return (
    <span
      style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: 700 }}
    >
      {children}
    </span>
  );
};

export default BoldText;
