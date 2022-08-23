import { Typography, Avatar, Box, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InputSelect from "../InputSelect";
import InputSlider from "../InputCounter";
import {
  formatDuration,
  getFuelText,
  getPumpCount,
  getFuelCost,
} from "../../utils";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";

const TripDetails = () => {
  const selectionData = useSelector((state) => state.mapData.selectionData);
  const fuelData = useSelector((state) => state.mapData.fuelData);
  const tripData = useSelector((state) => state.mapData.trip);
  const tripAdjData = useSelector((state) => state.mapData.tripAdjData);
  const theme = useTheme();
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            mb: 3,
            width: 54,
            height: 54,
            background: `${theme.colors.gradients.black2}`,
            color: `${theme.colors.alpha.trueWhite[100]}`,
          }}
        >
          <LightbulbCircleIcon />
        </Avatar>
        <Typography
          variant="h3"
          sx={{
            ml: 2,
            fontSize: `${theme.typography.pxToRem(18)}`,
          }}
        >
          About Your Trip
        </Typography>
      </Box>
      <Typography
        variant="h6"
        sx={{ textTransform: "uppercase", fontWeight: 450 }}
      >
        Your {selectionData.year} {selectionData.make} {selectionData.model} can
        hold about {selectionData.fuel_tank_size} gallons of gas and has an
        approximate range of{" "}
        {selectionData.comb08 * selectionData.fuel_tank_size} miles. It can get
        an average of {selectionData.city08} MPG driving in the city, an average
        of {selectionData.highway08} MPG driving on the highway with a combined
        of about {selectionData.comb08} MPG. The preferred fuel type for your
        car is {getFuelText(selectionData.fuel_type)}. If you were to pump
        {<InputSelect type={"FuelType"} />}{" "}
        {tripAdjData.fuel_type === 4 ? "fuel" : "gasolines"}, you will be
        looking at an average of{" "}
        {fuelData.startAvg[tripAdjData.fuel_type - 1].toFixed(2)} per gallon at
        your starting point or{" "}
        {fuelData.endAvg[tripAdjData.fuel_type - 1].toFixed(2)} per gallon at
        your destination.
        <br />
        <br />
        You can expect to pay between{" "}
        {fuelData.startMin[tripAdjData.fuel_type - 1]} to{" "}
        {fuelData.startMax[tripAdjData.fuel_type - 1]} per gallon at your
        starting point and between {fuelData.endMin[tripAdjData.fuel_type - 1]}{" "}
        to {fuelData.endMax[tripAdjData.fuel_type - 1]} per gallon at your
        destination.
        <br />
        <br />
        From your starting point to your destination, the distance is about{" "}
        {Math.round(tripData.distance)} miles and will take you about{" "}
        {formatDuration(tripData.duration)} to get there. If you were to drive{" "}
        {<InputSlider />} of your trip in the city, your adjusted MPG would be{" "}
        {Number(tripAdjData.adjMPG).toFixed(2)} and the total fuel cost for your
        trip will be between $
        {getFuelCost(
          tripData.distance,
          tripAdjData.adjMPG,
          fuelData.startMin[tripAdjData.fuel_type - 1]
        )}
        -
        {getFuelCost(
          tripData.distance,
          tripAdjData.adjMPG,
          fuelData.startMax[tripAdjData.fuelType - 1]
        )}{" "}
        or about $
        {getFuelCost(
          tripData.distance,
          tripAdjData.adjMPG,
          fuelData.startAvg[tripAdjData.fuelType - 1]
        )}{" "}
        on average. If you start with a {<InputSelect type={"TankSize"} />} tank
        of gas,{" "}
        {getPumpCount(
          tripAdjData.fuelTankSize,
          selectionData.minTankSize,
          tripData.distance,
          tripAdjData.adjMPG
        )}
        .
      </Typography>
    </>
  );
};

export default TripDetails;
