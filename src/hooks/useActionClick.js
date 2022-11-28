import { useSelector } from "react-redux";

const useActionClick = () => {
  const { isOpen, } = useSelector(
    (state) => state.actionClick
  );
  return {
    isOpen,
  };
};

export default useActionClick;
