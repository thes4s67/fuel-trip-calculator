import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getOptionMakes,
  getOptionModels,
  getOptionTrims,
  getSelectionData,
  getIPData,
} from "../store/slices/mapDataSlice";

export const useVehicleSelection = () => {
  const dispatch = useDispatch();
  const selection = useSelector((state) => state.mapData.selection);
  const ipData = useSelector((state) => state.mapData.suggestions.default);
  useEffect(() => {
    if (ipData.ipAddress === null) {
      dispatch(getIPData());
    }
    //Get Makes
    if (
      selection.year.value !== null &&
      !selection.make.disabled &&
      selection.model.disabled
    ) {
      dispatch(getOptionMakes({ type: "makes", year: selection.year.value }));
    }
    //Get Models
    if (
      selection.make.value !== null &&
      !selection.model.disabled &&
      selection.trim.disabled
    ) {
      dispatch(
        getOptionModels({
          type: "models",
          year: selection.year.value,
          make: selection.make.value,
        })
      );
    }
    //Get Trims
    if (selection.model.value !== null && !selection.trim.disabled) {
      dispatch(
        getOptionTrims({
          type: "trims",
          year: selection.year.value,
          make: selection.make.value,
          model: selection.model.value,
        })
      );
    }
    //Once trim is selected
    if (selection.trim.value !== null) {
      dispatch(
        getSelectionData({
          type: "sData",
          year: selection.year.value,
          make: selection.make.value,
          model: selection.model.value,
          trim: selection.trim.value,
        })
      );
    }
  }, [selection]);
};
