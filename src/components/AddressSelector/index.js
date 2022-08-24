import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  useTheme,
  Autocomplete,
  CircularProgress,
  TextField,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getTripData,
  getFuelData,
  getSuggestionData,
  updateAddress,
} from "../../store/slices/mapDataSlice";
import DirectionsIcon from "@mui/icons-material/Directions";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";

const AddressSelector = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const suggestions = useSelector((state) => state.mapData.suggestions);
  const selection = useSelector((state) => state.mapData.selection);
  const selectOptions = useSelector((state) => state.mapData.selectOptions);
  const dispatch = useDispatch();

  const handleCalculate = async () => {
    if (
      (selection.trim.value == null && selection.model.value == null) ||
      (selectOptions.trims.length > 0 && selection.trim.value == null)
    ) {
      setMessage("You need to select all options for your vehicle to proceed");
      setOpen(true);
    } else if (
      suggestions.start.value === null ||
      suggestions.destination.value === null
    ) {
      setMessage(
        "You need to select your starting point/destination to proceed"
      );
      setOpen(true);
    } else {
      const addresses = [
        suggestions.start.value,
        suggestions.destination.value,
      ];
      dispatch(getTripData(addresses));
      dispatch(getFuelData(addresses));
    }
  };

  const handleOnChange = (e, newVal, reason, detail, idx) => {
    if (reason === "selectOption") {
      dispatch(
        updateAddress({
          address: newVal.label,
          coordinates: newVal.coordinates,
          region: newVal.region,
          idx,
        })
      );
    } else if (reason === "clear") {
      dispatch(
        updateAddress({
          address: null,
          coordinates: null,
          region: null,
          idx,
        })
      );
    } else if (reason === "removeOption") {
      dispatch(
        updateAddress({
          address: null,
          coordinates: null,
          region: null,
          idx,
        })
      );
    }
  };

  const handleAddressChange = async (e, idx) => {
    console.log(idx, suggestions.default.long, suggestions.default.lat);
    dispatch(
      getSuggestionData({
        address: e.target.value,
        idx,
        long: suggestions.default.long,
        lat: suggestions.default.lat,
      })
    );
  };

  const debounceHandler = useCallback(_.debounce(handleAddressChange, 500), []);

  return (
    <>
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
              <DirectionsIcon />
            </Avatar>
            <Typography
              variant="h3"
              sx={{
                ml: 2,
                fontSize: `${theme.typography.pxToRem(18)}`,
              }}
            >
              Map Your Trip
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#000", mr: 2 }}>A</Avatar>
              <Autocomplete
                disablePortal
                loading={suggestions.start.loading}
                id="combo-box-demo"
                options={suggestions.start.suggestion}
                onChange={(e, newVal, reason, detail) =>
                  handleOnChange(e, newVal, reason, detail, 0)
                }
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose starting point"
                    onChange={(e) => debounceHandler(e, 0)}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {suggestions.start.loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#000", mr: 2, mt: 2 }}>B</Avatar>
              <Autocomplete
                loading={suggestions.destination.loading}
                disablePortal
                id="combo-box-demo"
                options={suggestions.destination.suggestion}
                onChange={(e, newVal, reason, detail) =>
                  handleOnChange(e, newVal, reason, detail, 1)
                }
                sx={{ width: "100%", mt: 2 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose destination"
                    onChange={(e) => debounceHandler(e, 1)}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {suggestions.destination.loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleCalculate}
            sx={{ mt: 2, float: "right" }}
          >
            Calculate Fuel Cost
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default AddressSelector;
