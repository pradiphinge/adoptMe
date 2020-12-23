import * as type from "./actionTypes";

export default function changeTheme(theme) {
  return { type: type.CHANGE_THEME, payload: theme };
}
