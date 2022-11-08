import {
  notificationStart,
  notificationSuccess,
  notificationFailed,
  notificationReset
} from "@/redux/reducer/notificationReducer";

export const setNotification = async (dispatch, data) => {
  dispatch(notificationStart());
  if (data.error) {
    dispatch(notificationFailed({ message: data.message }));
  } else {
    dispatch(notificationSuccess({ message: data.message }));
  }
};

export const resetNotification = async (dispatch) => {
  dispatch(notificationReset());
};
