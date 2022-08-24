import { Typography, Box, Link } from "@mui/material";
// import Link from "next/link"
const Footer = () => {
  return (
    <>
      <Box sx={{ display: "flex", mt: 7, justifyContent: "space-between" }}>
        <Typography variant="h6">Fuel Trip Calculator By Sonny N.</Typography>
        <Typography variant="h6">
          <Link href="https://github.com/thes4s67/fuel-trip-calculator">
            View GitHub Project
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
