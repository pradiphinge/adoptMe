import * as type from "./actionTypes";

export default function changeLocation(location) {
  return { type: type.CHANGE_LOCATION, payload: location };
}
