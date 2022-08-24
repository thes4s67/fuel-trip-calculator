import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/API";
import { getFuelType, getAdjMPG } from "../../utils";

export const getIPAddress = createAsyncThunk(
  "mapData/getIPAddress",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://www.geoplugin.net/json.gp?ip=`);
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
export const getSuggestionData = createAsyncThunk(
  "mapData/getSuggestionData",
  async (arg, { rejectWithValue }) => {
    try {
      console.log(arg, "args suggestionData");
      const { data } = await axios.post(`${baseUrl}/api/suggest`, {
        address: arg.address,
        idx: arg.idx,
        long: arg.long,
        lat: arg.lat,
      });
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
export const getFuelData = createAsyncThunk(
  "mapData/getFuelData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/fuel`, {
        addresses: arg,
      });
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
export const getTripData = createAsyncThunk(
  "mapData/getTripData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/directions`, {
        addresses: arg,
      });
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const getSelectionData = createAsyncThunk(
  "mapData/getSelectionData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/data`, {
        type: arg.type,
        year: arg.year,
        make: arg.make,
        model: arg.model,
        trim: arg.trim,
      });
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
export const getOptionMakes = createAsyncThunk(
  "mapData/getOptionMakes",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/data`, {
        type: arg.type,
        year: arg.year,
      });
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
export const getOptionModels = createAsyncThunk(
  "mapData/getOptionModels",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/data`, {
        type: arg.type,
        year: arg.year,
        make: arg.make,
      });
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);
export const getOptionTrims = createAsyncThunk(
  "mapData/getOptionTrims",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/data`, {
        type: arg.type,
        year: arg.year,
        make: arg.make,
        model: arg.model,
      });
      return data;
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

export const mapDataSlice = createSlice({
  name: "mapData",
  initialState: {
    loading: false,
    trip: { path: [], distance: "", directions: [], duration: "" },
    tripAdjData: {
      fuel_type: null,
      adjMPG: null,
      fuel_tank_size: 1,
      cityDriving: 55,
    },
    suggestions: {
      default: { long: null, lat: null, ipAddress: null },
      start: { loading: false, suggestion: [], value: null },
      destination: {
        loading: false,
        suggestion: [],
        value: null,
      },
    },
    selectOptions: {
      makes: [],
      models: [],
      trims: [0],
    },
    selection: {
      year: { disabled: false, value: null },
      make: { disabled: true, value: null },
      model: { disabled: true, value: null },
      trim: { disabled: true, value: null },
    },
    selectionData: {
      year: null,
      make: null,
      model: null,
      trim: null,
      city08: null,
      highway08: null,
      fuel_type: null,
      comb08: null,
      fuel_tank_size: null,
      thumbnail: null,
    },
    fuelData: {
      startAvg: [],
      endAvg: [],
      startMin: [],
      endMin: [],
      startMax: [],
      endMax: [],
    },
  },
  reducers: {
    updateTripAdjData: (state, param) => {
      if (param.payload.type === "FuelType") {
        state.tripAdjData = {
          ...state.tripAdjData,
          fuel_type: param.payload.value,
        };
      } else if (param.payload.type === "TankSize") {
        state.tripAdjData = {
          ...state.tripAdjData,
          fuel_tank_size: param.payload.value,
        };
      } else {
        state.tripAdjData = {
          ...state.tripAdjData,
          cityDriving: param.payload.value,
          adjMPG: getAdjMPG(
            state.selectionData.city08,
            state.selectionData.highway08,
            param.payload.value / 100
          ),
        };
      }
    },
    updateAddress: (state, param) => {
      if (param.payload.idx === 0) {
        state.suggestions.start.value = param.payload;
      } else {
        state.suggestions.destination.value = param.payload;
      }
      console.log(param, "params", state);
    },
    updateSelection: (state, param) => {
      switch (param.payload.type) {
        case "year":
          state.selection = {
            year: { disabled: false, value: param.payload.value },
            make: { disabled: false, value: null },
            model: { disabled: true, value: null },
            trim: { disabled: true, value: null },
          };
          break;
        case "make":
          state.selection = {
            ...state.selection,
            make: { disabled: false, value: param.payload.value },
            model: { disabled: false, value: null },
            trim: { disabled: true, value: null },
          };
          break;
        case "model":
          state.selection = {
            ...state.selection,
            model: { disabled: false, value: param.payload.value },
            trim: { disabled: false, value: null },
          };
          break;
        case "trim":
          state.selection = {
            ...state.selection,
            trim: { disabled: false, value: param.payload.value },
          };
          break;
        case "all":
          state.selection = {
            year: { disabled: false, value: param.payload.year },
            make: { disabled: false, value: param.payload.make },
            model: { disabled: false, value: param.payload.model },
            trim: { disabled: false, value: param.payload.trim },
          };
          break;
        case "reset":
          state.selectOptions = {
            makes: [],
            models: [],
            trims: [0],
          };
          state.selection = {
            year: { disabled: false, value: null },
            make: { disabled: true, value: null },
            model: { disabled: true, value: null },
            trim: { disabled: true, value: null },
          };
          break;
        default:
          return null;
      }
    },
  },
  extraReducers: {
    [getOptionMakes.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getOptionMakes.fulfilled]: (state, { payload }) => {
      state.selectOptions = { ...state.selectOptions, makes: payload.data };
    },
    [getOptionMakes.rejected]: (state, { payload }) => {
      //do something /w state
    },
    [getOptionModels.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getOptionModels.fulfilled]: (state, { payload }) => {
      state.selectOptions = { ...state.selectOptions, models: payload.data };
    },
    [getOptionModels.rejected]: (state, { payload }) => {
      //do something /w state
    },
    [getOptionTrims.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getOptionTrims.fulfilled]: (state, { payload }) => {
      state.selectOptions = { ...state.selectOptions, trims: payload.data };
    },
    [getOptionTrims.rejected]: (state, { payload }) => {
      //do something /w state
    },
    [getSelectionData.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getSelectionData.fulfilled]: (state, { payload }) => {
      state.selectionData = payload.data;
    },
    [getSelectionData.rejected]: (state, { payload }) => {
      //do something /w state
    },
    [getTripData.pending]: (state, { payload }) => {
      //do something /w state
    },
    [getTripData.fulfilled]: (state, { payload }) => {
      state.trip = {
        path: payload.data.features[0].geometry.coordinates,
        distance: Math.ceil(
          payload.data.features[0].properties.summary.distance
        ),
        directions: payload.data.features[0].properties.segments[0].steps,
        duration: payload.data.features[0].properties.summary.duration,
      };
    },
    [getTripData.rejected]: (state, { payload }) => {
      //do something /w state
    },
    [getFuelData.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getFuelData.fulfilled]: (state, { payload }) => {
      state.fuelData = payload.data;
      state.loading = false;
      state.tripAdjData = {
        ...state.tripAdjData,
        fuel_type: getFuelType(state.selectionData.fuel_type),
        adjMPG: state.selectionData.comb08,
      };
    },
    [getFuelData.rejected]: (state, { payload }) => {
      //do something /w state
    },
    [getSuggestionData.pending]: (state, { meta }) => {
      if (meta.arg.idx === 0) {
        state.suggestions = {
          ...state.suggestions,
          start: { ...state.suggestions.start, loading: true },
        };
      } else {
        state.suggestions = {
          ...state.suggestions,
          destination: { ...state.suggestions.destination, loading: true },
        };
      }
    },
    [getSuggestionData.fulfilled]: (state, { payload }) => {
      console.log(payload, "suggestionData payload");
      if (payload.idx === 0) {
        state.suggestions = {
          ...state.suggestions,
          start: {
            ...state.suggestions.start,
            loading: false,
            suggestion: payload.data.features.map((c) => {
              return {
                label: c.properties.label,
                region: c.properties.region,
                coordinates: c.geometry.coordinates,
              };
            }),
          },
        };
      } else {
        state.suggestions = {
          ...state.suggestions,
          destination: {
            ...state.suggestions.destination,
            loading: false,
            suggestion: payload.data.features.map((c) => {
              return {
                label: `${c.properties.label}`,
                coordinates: c.geometry.coordinates,
                region: c.properties.region,
              };
            }),
          },
        };
      }
    },
    [getSuggestionData.rejected]: (state, { payload }) => {
      //do something /w state
      console.log("something bad happened on address suggestion");
    },
    [getIPAddress.pending]: (state, { meta }) => {},
    [getIPAddress.fulfilled]: (state, { payload }) => {
      state.suggestions.default = {
        long: payload.geoplugin_longitude,
        lat: payload.geoplugin_latitude,
        ipAddress: payload.geoplugin_request,
      };
      // default: { long: null, lat: null, ipAddress: null },
    },
    [getIPAddress.rejected]: (state, { meta }) => {
      //do something /w state
      console.log(meta, "rejected ip address");
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSelection, updateAddress, updateTripAdjData } =
  mapDataSlice.actions;

export default mapDataSlice.reducer;
