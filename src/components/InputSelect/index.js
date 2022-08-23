import { Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateTripAdjData } from "../../store/slices/mapDataSlice";

const fuelTypes = [
  { label: "Regular", value: 1 },
  { label: "Midgrade", value: 2 },
  { label: "Premium", value: 3 },
  { label: "Diesel", value: 4 },
];

const tankSizes = [
  { label: "Full", value: 1 },
  { label: "3/4", value: 0.75 },
  { label: "1/2", value: 0.5 },
  { label: "1/4", value: 0.25 },
  { label: "Empty", value: 0 },
];

const InputSelect = ({ type }) => {
  const tripAdjData = useSelector((state) => state.mapData.tripAdjData);
  const dispatch = useDispatch();
  const getOptionsByType = () => {
    if (type === "FuelType") {
      return fuelTypes.map((c) => {
        return <MenuItem value={c.value}>{c.label}</MenuItem>;
      });
    } else {
      return tankSizes.map((c) => {
        return <MenuItem value={c.value}>{c.label}</MenuItem>;
      });
    }
  };
  return (
    <>
      <Select
        variant="standard"
        sx={{
          mr: 0.5,
          ml: 0.5,
          fontSize: "20px",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
        value={
          type === "FuelType"
            ? tripAdjData.fuel_type
            : tripAdjData.fuel_tank_size
        }
        onChange={(e) =>
          dispatch(updateTripAdjData({ value: e.target.value, type }))
        }
      >
        {getOptionsByType()}
      </Select>
    </>
  );
};

export default InputSelect;
