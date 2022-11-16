const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        access_token: null,
        isAuthenticated: false,
        refresh_token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        access_token: action.payload.access_token,
        isAuthenticated: true,
        refresh_token: action.payload.refresh_token,
      };
    case "LOGIN_FAILURE":
      return {
        access_token: null,
        isAuthenticated: false,
        refresh_token: null,
      };
    case "LOGOUT":
      return {
        access_token: null,
        isAuthenticated: false,
        refresh_token: null,
      };
    case "UPDATE_JWT_TOKEN":
      return {
        access_token: action.payload.access_token,
        isAuthenticated: true,
        refresh_token: action.payload.refresh_token,
      };
    default:
  }
};

export default AuthReducer;
