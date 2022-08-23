import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Slider,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
} from "@mui/material";
import { updateTripAdjData } from "../../store/slices/mapDataSlice";

const InputCounter = () => {
  const tripAdjData = useSelector((state) => state.mapData.tripAdjData);
  const dispatch = useDispatch();
  return (
    <TextField
      style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: 700 }}
      // width={20}
      type="number"
      size="small"
      variant="standard"
      value={tripAdjData.cityDriving}
      InputProps={{
        inputProps: { min: 0, max: 100 },
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
      onChange={(e) => {
        if (e.target.value === "") {
          dispatch(updateTripAdjData({ value: null, type: "CityDriving" }));
        } else if (e.target.value < 0 || e.target.value > 100) {
          dispatch(updateTripAdjData({ value: 0, type: "CityDriving" }));
        } else {
          dispatch(
            updateTripAdjData({ value: e.target.value, type: "CityDriving" })
          );
        }
      }}
      //   InputLabelProps={{
      //     shrink: true,
      //   }}
    />
  );
};

export default InputCounter;
