import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./reducer";
import Role from "./roleReducer";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  Role: Role,
}); // use this root reducer in case u will have more than one reducer

const persistConfig = { key: "root", storage, version: 1 };
export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {app: persistedReducer, auth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
console.log(store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("State after dispatch: ", store.getState())
);
