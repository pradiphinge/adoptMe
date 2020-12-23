import * as perform from "../actionCreators/actionTypes";

export default function themeReducer(state = "peru", action) {
  const { type, payload } = action;
  switch (type) {
    case perform.CHANGE_THEME:
      return payload;

    default:
      return state;
  }
}
