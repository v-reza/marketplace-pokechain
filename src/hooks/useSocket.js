import { SocketContext } from "@/contexts/SocketContext";
import { useContext } from "react";

const useSocket = () => useContext(SocketContext);

export default useSocket;
