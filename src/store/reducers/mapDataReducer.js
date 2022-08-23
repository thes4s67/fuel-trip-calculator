const initialState = {
  sample: [],
  loading: true,
  selection: {
    year: { disabled: false, value: null },
    make: { disabled: true, value: null },
    model: { disabled: true, value: null },
    trim: { disabled: true, value: null },
  },
};

const mapDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SAMPLE":
      return {
        ...state,
        sample: action.payload,
        loading: false,
      };

    case "SAMPLE_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default mapDataReducer;
