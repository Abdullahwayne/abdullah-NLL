import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./user";
import { namesReducer } from "./names";
import { lineupReducer } from "./lineup";
import { BPScheduleReducer } from "./BPSchedule.redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    names: namesReducer,
    lineup: lineupReducer,
    bpSchedule: BPScheduleReducer,
  })
);
const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistedStore = persistStore(store);
export default store;
export { persistedStore };
