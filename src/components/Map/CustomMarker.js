import { Avatar } from "@mui/material";
const CustomMarker = ({ left, top, style, children, point }) => {
  return (
    <Avatar
      sx={{
        bgcolor: "#eee",
        position: "absolute",
        left: left - 15,
        top: top - 30,
        width: 30,
        height: 30,
        background: "#000",
        ...(style || {}),
      }}
    >
      {point}
    </Avatar>
  );
};

export default CustomMarker;
