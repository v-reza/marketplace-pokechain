import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { createContext, useEffect, useReducer, useState } from "react";
import SocketReducer from "./SocketReducer";
import { io } from "socket.io-client";
import axios from "axios";
const initialState = {
  socket: null,
};

export const SocketContext = createContext(initialState);

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, initialState);
  const [ipAddress, setIpAddress] = useState(null);
  const { currentUser } = useUser();
  const { isAuthenticated } = useAuth();

  const BASE_DOMAIN = process.env.BASE_DOMAIN || "http://localhost:3001";

  const socketIsNotAuthenticated = async (socket) => {
    await socket.emit("addDomainIp", {
      domainName: BASE_DOMAIN,
      ipAddress: ipAddress,
    });
  };

  const socketIsAuthenticated = async (socket) => {
    await socket.emit("addUser", {
      userId: currentUser?.userId,
      domain: BASE_DOMAIN,
    });
  };

  useEffect(() => {
    const getIpAddress = async () => {
      const response = await axios.get("https://geolocation-db.com/json/");
      setIpAddress(response.data.IPv4);
    };
    getIpAddress();
  }, []);

  useEffect(() => {
    const serverSocket = process.env.SOCKET_SERVER || "http://localhost:5001";
    const socket = io(serverSocket);
    socket.connect();
    dispatch({
      type: "SOCKET",
      socket,
    });

    if (!isAuthenticated) {
      socketIsNotAuthenticated(socket);
    } else {
      socketIsAuthenticated(socket);
    }

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, currentUser]);

  return (
    <SocketContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};
