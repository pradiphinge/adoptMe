import * as dux from "../actionCreators/actionTypes";

export default function location(state = "Seattle, WA", action) {
  const { type, payload } = action;
  switch (type) {
    case dux.CHANGE_LOCATION:
      return payload;

    default:
      return state;
  }
}
