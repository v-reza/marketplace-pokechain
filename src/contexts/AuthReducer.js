const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        access_token: null,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
      return {
        access_token: action.payload.access_token,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        access_token: null,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        access_token: null,
        isAuthenticated: false,
      };
    default:
  }
};

export default AuthReducer;
