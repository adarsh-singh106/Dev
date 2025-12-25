export const authReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODE":
      return {
        ...state,
        signState: state.signState === "SignUp" ? "SignIn" : "SignUp",
        error: "",
      };
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return {
        ...state,
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        error: "",
        loading: "",
      };
    case "SET_ERROR":
        return {
            ...state,
            error:action.payload,
            loading:false,
        }
    default:
        return state
  }
};

