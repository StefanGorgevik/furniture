import {
  OPEN_MODAL,
  CLOSE_MODAL,
  LOADING_START,
  LOADING_STOP,
  ACTION_SUCCESS,
  CLOSE_NOTIFICATION_MODAL,
} from "./uiTypes";

export const setLoadingStart = () => ({ type: LOADING_START });
export const setLoadingStop = () => ({ type: LOADING_STOP });

export const openModal = (modal, data) => ({ type: OPEN_MODAL, modal, data });
export const closeModal = () => ({ type: CLOSE_MODAL });

export const setActionStatus = (type, message) => ({
  type: ACTION_SUCCESS,
  messageType: type,
  message,
});

export const closeNotificationModal = () => ({
  type: CLOSE_NOTIFICATION_MODAL,
});
