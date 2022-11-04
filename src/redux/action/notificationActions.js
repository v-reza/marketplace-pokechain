import {
  loadIsStart,
  loadIsSuccess,
  loadIsFailed,
} from "@/redux/reducer/notificationReducer";

export const setNotification = async (dispatch, data) => {
  dispatch(loadIsStart());
  if (data.error) {
    dispatch(loadIsFailed({ message: data.message }));
  } else {
    dispatch(loadIsSuccess({ message: data.message }));
  }
};
