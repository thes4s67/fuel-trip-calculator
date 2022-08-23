import { useSelector, useDispatch } from "react-redux";
import { updateSelection } from "../../store/slices/mapDataSlice";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const SelectBox = ({ type, label, options, width, setStatus }) => {
  const disabled = useSelector(
    (state) => state.mapData.selection[type].disabled
  );
  const selection = useSelector((state) => state.mapData.selection);
  const dispatch = useDispatch();
  return (
    <>
      <FormControl sx={{ m: 1, width: `${width}px` }}>
        <InputLabel>{label}</InputLabel>
        <Select
          key={`${type}-1`}
          disabled={disabled}
          value={selection[type].value}
          onChange={(e) => {
            dispatch(updateSelection({ value: e.target.value, type }));
          }}
          autoWidth
          label={label}
        >
          {options.map((c, i) => {
            return (
              <MenuItem key={`${type}-${i}`} value={c.value}>
                {c.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectBox;
