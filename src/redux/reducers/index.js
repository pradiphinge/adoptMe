import { combineReducers } from "redux";
//import adoptionReducer from "./adoptionReducer";
import storeLocation from "./locationReducer";
import storeTheme from "./themeReducer";

const rootReducer = combineReducers({
  storeLocation,
  storeTheme,
});

export default rootReducer;
