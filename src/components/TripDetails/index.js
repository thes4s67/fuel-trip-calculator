import { Typography, Avatar, Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import InputSelect from "../InputSelect";
import InputSlider from "../InputCounter";
import {
  formatDuration,
  getFuelText,
  getPumpCount,
  getFuelCost,
} from "../../utils";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import BoldText from "../BoldText";

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
      <Box>
        <Typography
          variant="h6"
          sx={{ textTransform: "uppercase", fontWeight: 450 }}
        >
          Your{" "}
          <BoldText>
            {selectionData.year} {selectionData.make} {selectionData.model}
          </BoldText>{" "}
          can hold about <BoldText>{selectionData.fuel_tank_size}</BoldText>{" "}
          gallons of gas and has an approximate range of{" "}
          <BoldText>
            {selectionData.comb08 * selectionData.fuel_tank_size} miles
          </BoldText>
          {". "}It can get an average of{" "}
          <BoldText>{selectionData.city08} MPG</BoldText> driving in the city,
          an average of <BoldText>{selectionData.highway08} MPG</BoldText>{" "}
          driving on the highway with a combined of about{" "}
          <BoldText>{selectionData.comb08} MPG</BoldText>.
          <br/>
          <br/>
          The preferred fuel type for your car is{" "}
          <BoldText>{getFuelText(selectionData.fuel_type)}</BoldText>. If you
          were to pump
          {<InputSelect type={"FuelType"} />}{" "}
          {tripAdjData.fuel_type === 4 ? "fuel" : "gasoline"}, you will be
          looking at an average of{" "}
          {
            <BoldText>
              ${fuelData.startAvg[tripAdjData.fuel_type - 1].toFixed(2)}
            </BoldText>
          }{" "}
          per gallon at your starting point or{" "}
          <BoldText>
            ${fuelData.endAvg[tripAdjData.fuel_type - 1].toFixed(2)}
          </BoldText>{" "}
          per gallon at your destination.
          <br />
          <br />
          You can expect to pay between{" "}
          <BoldText>
            ${fuelData.startMin[tripAdjData.fuel_type - 1]}
          </BoldText> to{" "}
          <BoldText>${fuelData.startMax[tripAdjData.fuel_type - 1]}</BoldText>{" "}
          per gallon at your starting point and between{" "}
          <BoldText>${fuelData.endMin[tripAdjData.fuel_type - 1]}</BoldText> to{" "}
          <BoldText>${fuelData.endMax[tripAdjData.fuel_type - 1]}</BoldText> per
          gallon at your destination.
          <br />
          <br />
          From your starting point to your destination, the distance is about{" "}
          <BoldText>{Math.round(tripData.distance)} miles</BoldText> and will
          take you about{" "}
          <BoldText>{formatDuration(tripData.duration)}</BoldText> to get there.
          If you were to drive {<InputSlider />} of your trip in the city, your
          adjusted MPG would be{" "}
          <BoldText>{Number(tripAdjData.adjMPG).toFixed(2)}</BoldText> and the
          total fuel cost for your trip will be between{" "}
          <BoldText>
            $
            {getFuelCost(
              tripData.distance,
              tripAdjData.adjMPG,
              fuelData.startMin[tripAdjData.fuel_type - 1]
            )}
          </BoldText>
          {" "}to{" "}
          <BoldText>
            ${getFuelCost(
              tripData.distance,
              tripAdjData.adjMPG,
              fuelData.startMax[tripAdjData.fuel_type - 1]
            )}
          </BoldText>{" "}
          or about{" "}
          <BoldText>
            $
            {getFuelCost(
              tripData.distance,
              tripAdjData.adjMPG,
              fuelData.startAvg[tripAdjData.fuel_type - 1]
            )}
          </BoldText>{" "}
          on average. If you start with a {<InputSelect type={"TankSize"} />}{" "}
          tank of gas,{" "}
          <BoldText>
            {" "}
            {getPumpCount(
              tripAdjData.fuel_tank_size,
              selectionData.fuel_tank_size,
              tripData.distance,
              tripAdjData.adjMPG
            )}
          </BoldText>
          .
        </Typography>
      </Box>
    </>
  );
};

export default TripDetails;
