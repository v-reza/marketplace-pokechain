const SocketReducer = (state, action) => {
  switch (action.type) {
    case "SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    default:
  }
};

export default SocketReducer;