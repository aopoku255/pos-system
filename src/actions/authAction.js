import { LOGGED_ID } from "./type";

export function authAction() {
  return function (dispatch) {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((res) =>
        dispatch({
          type: LOGGED_ID,
          payload: res,
        })
      );
  };
}
