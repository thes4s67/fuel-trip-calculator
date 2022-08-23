import { useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Avatar,
  useTheme,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SelectBox from "../SelectBox";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSelection,
  getOptionMakes,
  getOptionModels,
  getOptionTrims,
} from "../../store/slices/mapDataSlice";

const VehicleSelector = ({ yearOptions }) => {
  const theme = useTheme();
  const selection = useSelector((state) => state.mapData.selection);
  const selectOptions = useSelector((state) => state.mapData.selectOptions);
  const dispatch = useDispatch();
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("fgcSN"));
    if (localData) {
      dispatch(getOptionMakes({ type: "makes", year: localData.year }));
      dispatch(
        getOptionModels({
          type: "models",
          year: localData.year,
          make: localData.make,
        })
      );
      dispatch(
        getOptionTrims({
          type: "trims",
          year: localData.year,
          make: localData.make,
          model: localData.model,
        })
      );
      dispatch(updateSelection({ ...localData, type: "all" }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      "fgcSN",
      JSON.stringify({
        year: selection.year.value,
        make: selection.make.value,
        model: selection.model.value,
        trim: selection.trim.value,
      })
    );
  };

  const handleReset = () => {
    localStorage.removeItem("fgcSN");
    dispatch(updateSelection({ type: "reset" }));
  };

  return (
    <Card
      sx={{
        position: "relative",
        p: 2,
      }}
    >
      <CardContent>
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
            <DirectionsCarIcon />
          </Avatar>
          <Typography
            variant="h3"
            sx={{
              ml: 2,
              fontSize: `${theme.typography.pxToRem(18)}`,
            }}
          >
            Select Your Vehicle
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <SelectBox
            type={"year"}
            label={"Year"}
            width={120}
            options={yearOptions}
          />
          <SelectBox
            type={"make"}
            label={"Make"}
            width={220}
            options={selectOptions.makes}
          />
          <SelectBox
            type={"model"}
            label={"Model"}
            width={300}
            options={selectOptions.models}
          />
          <SelectBox
            type={"trim"}
            label={"Trim"}
            width={320}
            options={selectOptions.trims}
          />
        </Box>
      </CardContent>
      {/* <Typography
        variant="subtitle2"
        sx={{
          mb: 3,
          fontSize: `${theme.typography.pxToRem(14)}`,
        }}
      >
        You can build unlimited layout styles using any of the 500+ included
        components and elements...
      </Typography> */}
      {(selection.trim.value !== null && selection.model.value !== null) ||
      (!selection.trim.disabled && selectOptions.trims.length == 0) ||
      selection.trim.value !== null ? (
        <CardActions sx={{ float: "right" }}>
          <Box component="span" mr={0.5}>
            <Button variant="contained" size="small" onClick={handleSave}>
              Save
            </Button>
          </Box>
          <Button variant="outlined" size="small" onClick={handleReset}>
            Reset
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default VehicleSelector;
