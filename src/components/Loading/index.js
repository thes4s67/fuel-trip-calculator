import { useEffect, useState } from "react";
import { Box, useTheme, Card, Typography } from "@mui/material";
import GaugeChart from "react-gauge-chart";

const Loading = () => {
  useEffect(() => {
    const addPercent = () => {
      setPercent((current) => (current <= 1 ? current + 0.1 : 0));
    };
    const interval = setInterval(addPercent, 200);
    return () => clearInterval(interval);
  }, []);
  const theme = useTheme();
  const [percent, setPercent] = useState(0);
  return (
    <Card sx={{ px: 4, pt: 4, pb: 1, height: "100%" }}>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "300px",
        }}
      >
        <GaugeChart
          nrOfLevels={6}
          hideText
          cornerRadius={3}
          needleColor={theme.colors.alpha.black[30]}
          needleBaseColor={theme.colors.alpha.black[100]}
          colors={[
            theme.colors.alpha.black[10],
            theme.colors.alpha.black[100],
          ]}
          arcWidth={0.3}
          percent={percent}
        />
      </Box>
      <Box
        sx={{
          textAlign: "center",
          mb: 2,
        }}
      >
        <Typography component="span" align="center" variant="subtitle2">
          {"Data is loading...."}
        </Typography>
      </Box>
    </Card>
  );
};

export default Loading;
