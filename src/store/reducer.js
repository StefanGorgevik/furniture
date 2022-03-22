import { combineReducers } from "redux";
import furnitureReducer from "./furniture/furnitureReducer";
import authReducer from "store/auth/authReducer";
import uiReducer from "./ui/uiReducer";
import cartReducer from "./cart/cartReducer";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default combineReducers({
  router: connectRouter(history),
  uiReducer,
  furnitureReducer,
  authReducer,
  cartReducer,
});
