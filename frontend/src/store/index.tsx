import { createStore, combineReducers, applyMiddleware, Store, Middleware } from "redux";
import logger from "redux-logger";
import thunk, { ThunkMiddleware, ThunkDispatch } from "redux-thunk";
import { useDispatch as useReduxDispatch } from "react-redux";
import { authReducer, AuthAction } from "./auth";
import { codesReducer, CodesAction } from "./codetester";

const rootReducer = combineReducers({
  auth: authReducer,
  codes: codesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = AuthAction | CodesAction;

const thunkMiddleware: ThunkMiddleware<RootState, RootAction> = thunk;

const middlewares: Middleware[] = [thunkMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger as Middleware<RootState, RootAction>); // Cast logger to Middleware type
}

const store: Store<RootState, RootAction> = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

export type AppDispatch = ThunkDispatch<RootState, unknown, RootAction>;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export * from "./auth";
export * from "./codetester";
