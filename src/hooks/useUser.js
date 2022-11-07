import { useSelector } from "react-redux";

const useUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  return {
    currentUser,
  };
};

export default useUser;
