import {
  OPEN_MODAL,
  CLOSE_MODAL,
  LOADING_START,
  LOADING_STOP,
  ACTION_SUCCESS,
  CLOSE_NOTIFICATION_MODAL,
} from "./uiTypes";
const initState = {
  modal: false,
  modalType: "",
  modalData: null,
  loading: false,
  showNotification: false,
  message: "",
  messageType: "",
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modal: true,
        modalType: action.modal,
        modalData: action.data,
      };
    case CLOSE_MODAL:
      return { ...state, modal: false, modalData: null, modalType: "" };
    case LOADING_START:
      console.log("CALLED loading");
      return { ...state, loading: true };
    case LOADING_STOP:
      return { ...state, loading: false };
    case ACTION_SUCCESS:
      return {
        ...state,
        showNotification: true,
        message: action.message,
        messageType: action.type,
      };
    case CLOSE_NOTIFICATION_MODAL:
      return { ...state, showNotification: false };

    default:
      return state;
  }
};

export default uiReducer;
