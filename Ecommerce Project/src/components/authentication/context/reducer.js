const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "REGISTER":
      return state;
    default:
      return state;
  }
};

export default authReducer;
