import { useSelector } from "react-redux";

const useNotification = () => {
  const { isNotification, isSuccess, message } = useSelector(
    (state) => state.notification
  );
  return {
    isNotification,
    isSuccess,
    message,
  };
};

export default useNotification;
