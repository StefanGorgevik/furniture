import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "./reducer";
import mainSaga from "./sagas";

export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    connectRouter(history)(rootReducer),
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
  sagaMiddleware.run(mainSaga);
  return store;
}
