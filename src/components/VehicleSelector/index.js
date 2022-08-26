import { useEffect } from "react";
import {
  Box,
  Card,
  Grid,
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <SelectBox
              type={"year"}
              label={"Year"}
              width={120}
              options={yearOptions}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <SelectBox
              type={"make"}
              label={"Make"}
              width={220}
              options={selectOptions.makes}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectBox
              type={"model"}
              label={"Model"}
              width={300}
              options={selectOptions.models}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectBox
              type={"trim"}
              label={"Trim"}
              width={320}
              options={selectOptions.trims}
            />
          </Grid>
        </Grid>
      </CardContent>
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
