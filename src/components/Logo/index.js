import { Box, Avatar, Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", textAlign: "center", alignItems: "center" }}>
      <Avatar
        sx={{
          width: 54,
          height: 54,
        }}
        src="/images/logo.svg"
      />
      <Typography sx={{ ml: 2 }} variant="h2">
        Fuel Trip Calculator
      </Typography>
    </Box>
  );
};

export default Logo;
